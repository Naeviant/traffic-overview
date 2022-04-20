import express, { Request, Response, NextFunction } from 'express';
import cron from 'node-cron';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import * as dotenv from 'dotenv';

import { MotorwayList, ARoadList } from './types/RoadList';
import { CCTV, Event, Junction, RoadData, Section, VMSGroup } from './types/RoadData';
import processEvents from './helpers/processEvents';
import processCCTV from './helpers/processCCTV';
import processVMS from './helpers/processVMS';
import { APICCTV } from './types/APICCTV';
import { APIEvent } from './types/APIEvent';
import { APIVMSGroup } from './types/APIVMS';
import { APIRoads } from './types/APIRoads';
import build from './helpers/build';

dotenv.config();
const PORT = process.env.API_PORT ?? 8080;

async function fetchRoadList() {
    const motorwaysResp = await axios.get('https://www.trafficengland.com/api/network/getMotorwayJunctions');
    const motorwaysData = motorwaysResp.data as MotorwayList;

    const motorways = Object.keys(motorwaysData);

    const aRoadResp = await axios.get('https://www.trafficengland.com/api/network/getMajorARoads');
    const aRoadData = aRoadResp.data as ARoadList[];

    const aRoads = aRoadData.map((r: ARoadList) => { return r.roadName });

    const roads = motorways.concat(aRoads);
    
    const chunkSize = roads.length / 5;
    for (let i = 0; i < roads.length; i += chunkSize) {
        fs.writeFileSync(__dirname + `/../data/roads${(i / chunkSize) + 1}.json`, JSON.stringify(roads.slice(i, i + chunkSize), null, 4));
    }
}

async function fetchRoadData(roads: string[]) {
    if (process.env.API_STOP_FETCH && process.env.API_STOP_FETCH != 'FALSE') return;

    const timestamps = fs.readdirSync(__dirname + `/../data/roads/historical`);
    for (const timestamp of timestamps) {
        if (parseInt(timestamp) < Date.now() - 86400000) {
            fs.rmSync(__dirname + `/../data/roads/historical/${timestamp}`, { recursive: true, force: true });
        }
    }

    const fetchTime = (Math.floor((Date.now() - 300000) / 60000) * 60000).toString();
    fs.mkdirSync(__dirname + `/../data/roads/historical/${ fetchTime }`);
    for (const road of roads) {
        if (fs.existsSync(__dirname + `/../data/roads/${ road }.json`)) {
            fs.copyFileSync(__dirname + `/../data/roads/${ road }.json`, __dirname + `/../data/roads/historical/${ fetchTime }/${ road }.json`);
        }
    }

    const sectionsReq: Promise<AxiosResponse>[] = roads.map((x: string) => { return axios.get(`https://www.trafficengland.com/api/network/getJunctionSections?roadName=${ x }`); });
    const sectionsRes: AxiosResponse[] = await axios.all(sectionsReq);
    const sections: APIRoads = Object.fromEntries(roads.map((x: string) => [x, sectionsRes[roads.indexOf(x)].data]));

    const dataReq: Promise<AxiosResponse>[] = [
        axios.get(
            'https://www.trafficengland.com/api/events/getToBounds?bbox=-5.7,56.0,1.65,50&events=CONGESTION,FULL_CLOSURES,ROADWORKS,INCIDENT,WEATHER,MAJOR_ORGANISED_EVENTS,ABNORMAL_LOADS',
        ),
        axios.get(
            'https://www.trafficengland.com/api/cctv/getToBounds?bbox=-5.7,56.0,1.65,50',
        ),
        axios.get(
            'https://www.trafficengland.com/api/vms/getToBounds?bbox=-5.7,56.0,1.65,50',
        )
    ];
    const dataRes: (APIEvent[] | APICCTV[] | APIVMSGroup[])[] = (await axios.all(dataReq)).map((x: AxiosResponse) => x.data);

    for (const road of roads) {
        if (!sections[road]) continue;

        const data: RoadData = {
            road: road,
            dataTimestamp: Math.floor(Date.now() / 60000) * 60000,
            primaryDirection: Object.values(sections[road])[0].primaryDirection,
            secondaryDirection: Object.values(sections[road])[0].secondaryDirection,
            primaryDirectionSections: [],
            secondaryDirectionSections: [],
            circularRoad: Object.values(sections[road])[0].circularRoad
        };

        for (const section of Object.values(sections[road])) {
            if (section.junctionName === 'M60') continue;

            const primaryDirectionJunction: Junction = {
                interface: 'JUNCTION',
                payload: {
                    name: section.junctionName,
                    destination: section.primaryDirectionDescription
                }
            };
            const secondaryDirectionJunction: Junction = {
                interface: 'JUNCTION',
                payload: {
                    name: section.junctionName,
                    destination: section.secondaryDirectionDescription
                }
            };
            data.primaryDirectionSections.push(primaryDirectionJunction);
            data.secondaryDirectionSections.push(secondaryDirectionJunction);

            if (section.primaryDownstreamJunctionSection) {
                const primaryDirectionSection: Section = {
                    interface: 'SECTION',
                    payload: {
                        id: section.primaryDownstreamJunctionSection.id,
                        subsections: Array.isArray(section.primaryDownstreamJunctionSection.links) ? section.primaryDownstreamJunctionSection.links.map((x) => { return x.id }) : [],
                        speed: section.primaryDownstreamJunctionSection.avgSpeed,
                        length: Array.isArray(section.primaryDownstreamJunctionSection.links) ? section.primaryDownstreamJunctionSection.links.map((x) => { return x.length }).reduce((a: number, b: number) => a + b, 0) : 0,
                        speedLimits: Array.isArray(section.primaryDownstreamJunctionSection.links) ? Array.from(new Set(section.primaryDownstreamJunctionSection.links.map((x) => { return x.speedLimit }).filter((x: number) => x != 70))) : [],
                        data: []
                    }
                }
                
                const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
                    processEvents(dataRes[0] as APIEvent[], primaryDirectionSection.payload.subsections),
                    processCCTV(dataRes[1] as APICCTV[], primaryDirectionSection.payload.subsections),
                    processVMS(dataRes[2] as APIVMSGroup[], primaryDirectionSection.payload.subsections)
                ]) as [Event[], CCTV[], VMSGroup[]];

                primaryDirectionSection.payload.data = build(primaryDirectionSection.payload.subsections, promises[0], promises[1], promises[2], 'PRIMARY');

                data.primaryDirectionSections.push(primaryDirectionSection);
            }

            if (section.secondaryUpstreamJunctionSection) {
                const secondaryDirectionSection: Section = {
                    interface: 'SECTION',
                    payload: {
                        id: section.secondaryUpstreamJunctionSection.id,
                        subsections: Array.isArray(section.secondaryUpstreamJunctionSection.links) ? section.secondaryUpstreamJunctionSection.links.map((x) => { return x.id }) : [],
                        speed: section.secondaryUpstreamJunctionSection.avgSpeed,
                        length: Array.isArray(section.secondaryUpstreamJunctionSection.links) ? section.secondaryUpstreamJunctionSection.links.map((x) => { return x.length }).reduce((a: number, b: number) => a + b, 0) : 0,
                        speedLimits: Array.isArray(section.secondaryUpstreamJunctionSection.links) ? Array.from(new Set(section.secondaryUpstreamJunctionSection.links.map((x) => { return x.speedLimit }).filter((x: number) => x != 70))) : [],
                        data: []
                    }
                }
                
                const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
                    processEvents(dataRes[0] as APIEvent[], secondaryDirectionSection.payload.subsections),
                    processCCTV(dataRes[1] as APICCTV[], secondaryDirectionSection.payload.subsections),
                    processVMS(dataRes[2] as APIVMSGroup[], secondaryDirectionSection.payload.subsections)
                ]) as [Event[], CCTV[], VMSGroup[]];
                
                secondaryDirectionSection.payload.data = build(secondaryDirectionSection.payload.subsections, promises[0], promises[1], promises[2], 'SECONDARY');

                data.secondaryDirectionSections.push(secondaryDirectionSection);
            }
        }

        fs.writeFileSync(__dirname + `/../data/roads/${ road }.json`, JSON.stringify(data, null, 4));
    }
}

// Update list of motorways - every 24 hours at 12pm
cron.schedule('* 12 * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching List of Roads...');

    await fetchRoadList();
    
    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching List of Roads (${cronTime / 1000} Seconds)`);
});

// Update batch 1 of road data - every five minutes
cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 1 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads1.json', 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 1 of Road Data (${cronTime / 1000} Seconds)`);
});

// Update batch 2 of road data - every five minutes
cron.schedule('1,6,11,16,21,26,31,36,41,46,51,56 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 2 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads2.json', 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 2 of Road Data (${cronTime / 1000} Seconds)`);
});

// Update batch 3 of road data - every five minutes
cron.schedule('2,7,12,17,22,27,32,37,42,47,52,57 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 3 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads3.json', 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 3 of Road Data (${cronTime / 1000} Seconds)`);
});

// Update batch 4 of road data - every five minutes
cron.schedule('3,8,13,18,23,28,33,38,43,48,53,58 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 4 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads4.json', 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 4 of Road Data (${cronTime / 1000} Seconds)`);
});

// Update batch 5 of road data - every five minutes
cron.schedule('4,9,14,19,24,29,34,39,44,49,54,59 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 5 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads5.json', 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 5 of Road Data (${cronTime / 1000} Seconds)`);
});

const app = express();

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send({ status: 200, data: [] });
});

app.get('/roads', async (req: Request, res: Response) => {
    const roads1 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads1.json', 'utf8'));
    const roads2 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads2.json', 'utf8'));
    const roads3 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads3.json', 'utf8'));
    const roads4 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads4.json', 'utf8'));
    const roads5 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads5.json', 'utf8'));

    res.send({ status: 200, data: roads1.concat(roads2, roads3, roads4, roads5) });
});

app.get('/timestamps/:road', async (req: Request, res: Response) => {
    try {
        const road = JSON.parse(fs.readFileSync(__dirname + `/../data/roads/${ req.params.road }.json`, 'utf8'));

        const currentTimestamp = road.dataTimestamp;
        const previousTimestamps = [];

        const timestamps = fs.readdirSync(__dirname + `/../data/roads/historical`);
        for (const timestamp of timestamps) {
            if (fs.existsSync(__dirname + `/../data/roads/historical/${ timestamp }/${ req.params.road }.json`)) {
                previousTimestamps.push(timestamp);
            }
        }

        res.send({ status: 200, data: { currentTimestamp, previousTimestamps } });
    } catch(e) {
        res.status(404).send({ status: 404, data: [] });
    }
});

app.get('/road/:road', async (req: Request, res: Response) => {
    try {
        const road = fs.readFileSync(__dirname + `/../data/roads/${ req.params.road }.json`, 'utf8');

        res.send({ status: 200, data: JSON.parse(road) });
    } catch(e) {
        res.status(404).send({ status: 404, data: [] });
    }
});

app.get('/road/:road/historical/:timestamp', async (req: Request, res: Response) => {
    try {
        const road = fs.readFileSync(__dirname + `/../data/roads/historical/${ req.params.timestamp }/${ req.params.road }.json`, 'utf8');

        res.send({ status: 200, data: JSON.parse(road) });
    } catch(e) {
        res.status(404).send({ status: 404, data: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
});