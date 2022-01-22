import express, { Request, Response } from 'express';
import cron from 'node-cron';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import * as dotenv from 'dotenv';

import { RoadList } from './types/RoadList';
import { CCTV, Event, Junction, RoadData, Section, VMSGroup } from './types/RoadData';
import processEvents from './helpers/processEvents';
import processCCTV from './helpers/processCCTV';
import processVMS from './helpers/processVMS';
import sort from './helpers/sort';

dotenv.config();
const PORT = process.env.API_PORT ?? 8080;
const ROAD_CRON = process.env.API_ROAD_CRON ?? '* 12 * * *';
const DATA_CRON = process.env.API_DATA_CRON ?? '* * * * *';

// Update list of motorways - every 24 hours at 12pm
cron.schedule(ROAD_CRON, async () => {
    const cronStart = Date.now();
    console.log('Fetching List of Roads...');
    
    const resp = await axios.get('https://www.trafficengland.com/api/network/getMotorwayJunctions');
    const data = resp.data as RoadList;

    const roads = Object.keys(data);

    fs.writeFileSync(__dirname + '/../data/roads.json', JSON.stringify(roads, null, 4));
    
    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching List of Roads (${cronTime / 1000} Seconds)`)
});

// Update road data - every minute
cron.schedule(DATA_CRON, async () => {
    const cronStart = Date.now();
    console.log('Fetching Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads.json', 'utf8'));

    const sectionsReq: Promise<AxiosResponse>[] = roads.map((x: string) => { return axios.get(`https://www.trafficengland.com/api/network/getJunctionSections?roadName=${ x }`); });
    const sectionsRes: AxiosResponse[] = await axios.all(sectionsReq);
    const sections = Object.fromEntries(roads.map((x: string) => [x, sectionsRes[roads.indexOf(x)].data]));

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
    const dataRes: any[] = (await axios.all(dataReq)).map((x: AxiosResponse) => x.data);

    for (const road of roads) {
        const data: RoadData = {
            road: road,
            primaryDirection: (Object.values(sections[road] as any)[0] as any).primaryDirection,
            secondaryDirection: (Object.values(sections[road] as any)[0] as any).secondaryDirection,
            primaryDirectionSections: [],
            secondaryDirectionSections: [],
            circularRoad: (Object.values(sections[road] as any)[0] as any).circularRoad
        };

        for (const section of Object.values(sections[road])) {
            if ((section as any).junctionName === 'M60') continue;

            const primaryDirectionJunction: Junction = {
                interface: 'JUNCTION',
                payload: {
                    name: (section as any).junctionName,
                    destination: (section as any).primaryDirectionDescription
                }
            };
            const secondaryDirectionJunction: Junction = {
                interface: 'JUNCTION',
                payload: {
                    name: (section as any).junctionName,
                    destination: (section as any).secondaryDirectionDescription
                }
            };
            data.primaryDirectionSections.push(primaryDirectionJunction);
            data.secondaryDirectionSections.push(secondaryDirectionJunction);

            if ((section as any).primaryDownstreamJunctionSection) {
                const primaryDirectionSection: Section = {
                    interface: 'SECTION',
                    payload: {
                        id: (section as any).primaryDownstreamJunctionSection.id,
                        subsections: (section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.id }),
                        speed: (section as any).primaryDownstreamJunctionSection.avgSpeed,
                        length: (section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.length }).reduce((a: number, b: number) => a + b, 0),
                        speedLimits: Array.from(new Set((section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.speedLimit }).filter((x: number) => x != 70))),
                        data: []
                    }
                }
                
                const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
                    processEvents(dataRes[0], primaryDirectionSection.payload.subsections),
                    processCCTV(dataRes[1], primaryDirectionSection.payload.subsections),
                    processVMS(dataRes[2], primaryDirectionSection.payload.subsections)
                ]) as [Event[], CCTV[], VMSGroup[]];
                primaryDirectionSection.payload.data.push(...promises[0]);
                primaryDirectionSection.payload.data.push(...promises[1]);
                primaryDirectionSection.payload.data.push(...promises[2]);

                primaryDirectionSection.payload.data.sort(sort);

                data.primaryDirectionSections.push(primaryDirectionSection);
            }

            if ((section as any).secondaryUpstreamJunctionSection) {
                const secondaryDirectionSection: Section = {
                    interface: 'SECTION',
                    payload: {
                        id: (section as any).secondaryUpstreamJunctionSection.id,
                        subsections: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.id }),
                        speed: (section as any).secondaryUpstreamJunctionSection.avgSpeed,
                        length: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.length }).reduce((a: number, b: number) => a + b, 0),
                        speedLimits: Array.from(new Set((section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.speedLimit }).filter((x: number) => x != 70))),
                        data: []
                    }
                }
                
                const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
                    processEvents(dataRes[0], secondaryDirectionSection.payload.subsections),
                    processCCTV(dataRes[1], secondaryDirectionSection.payload.subsections),
                    processVMS(dataRes[2], secondaryDirectionSection.payload.subsections)
                ]) as [Event[], CCTV[], VMSGroup[]];
                secondaryDirectionSection.payload.data.push(...promises[0]);
                secondaryDirectionSection.payload.data.push(...promises[1]);
                secondaryDirectionSection.payload.data.push(...promises[2]);

                secondaryDirectionSection.payload.data.sort(sort);

                data.secondaryDirectionSections.push(secondaryDirectionSection);
            }
        }

        fs.writeFileSync(__dirname + `/../data/roads/${ road }.json`, JSON.stringify(data, null, 4));
    }

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Road Data (${cronTime / 1000} Seconds)`);
});

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send({ status: 200, data: [] });
});

app.get('/roads', async (req: Request, res: Response) => {
    const roads = fs.readFileSync(__dirname + '/../data/roads.json', 'utf8');

    res.send({ status: 200, data: JSON.parse(roads) });
});

app.get('/road/:road', async (req: Request, res: Response) => {
    try {
        const road = fs.readFileSync(__dirname + `/../data/roads/${ req.params.road }.json`, 'utf8');

        res.send({ status: 200, data: JSON.parse(road) });
    } catch(e) {
        res.send({ status: 404, data: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
});