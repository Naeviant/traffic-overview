import express, { Request, Response } from 'express';
import cron from 'node-cron';
import axios from 'axios';
import fs from 'fs';
import * as dotenv from 'dotenv';

import { RoadList } from './types/RoadList';
import { CCTV, Event, Junction, RoadData, Section, VMSGroup } from './types/RoadData';
import processEvents from './helpers/processEvents';
import processCCTV from './helpers/processCCTV';
import processVMS from './helpers/processVMS';
import sort from './helpers/sort';

dotenv.config();

// Update list of motorways - every 24 hours at 12pm
cron.schedule('* 12 * * *', async () => {
    console.log('Fetching List of Roads...');
    
    const resp = await axios.get('https://www.trafficengland.com/api/network/getMotorwayJunctions');
    const data = resp.data as RoadList;

    const roads = Object.keys(data);

    fs.writeFileSync(__dirname + '/../data/roads.json', JSON.stringify(roads));
    
    console.log('Finished Fetching List of Roads')
});

// Update road data - every minute
cron.schedule('* * * * *', async () => {
    console.log('Fetching Road Data...');

    const roads = JSON.parse(fs.readFileSync(__dirname + '/../data/roads.json', 'utf8'));

    for (const road of roads) {
        const sectionResp = await axios.get(`https://www.trafficengland.com/api/network/getJunctionSections?roadName=${ road }`);
        const sections = sectionResp.data;

        const startJunctionKey = Object.keys(sections)[0];
        const endJunctionKey = Object.keys(sections)[Object.keys(sections).length - 1];
        const startJunctionId =
            sections[startJunctionKey].primaryUpstreamJunctionSection?.downStreamJunctionId ??
            sections[startJunctionKey].primaryDownstreamJunctionSection?.upStreamJunctionId;
        const endJunctionId =
            sections[endJunctionKey].primaryUpstreamJunctionSection?.downStreamJunctionId ??
            sections[endJunctionKey].primaryDownstreamJunctionSection?.upStreamJunctionId;

        const eventsReq= axios.get(
            `https://www.trafficengland.com/api/events/getByJunctionInterval?road=${ road }&fromId=${startJunctionId}&toId=${endJunctionId}&events=CONGESTION,INCIDENT,ROADWORKS,WEATHER,MAJOR_ORGANISED_EVENTS,ABNORMAL_LOADS&includeUnconfirmedRoadworks=true`,
        );
        const cctvReq = axios.get(
            `https://www.trafficengland.com/api/cctv/getByJunctionInterval?road=${ road }&fromId=${startJunctionId}&toId=${endJunctionId}`,
        );
        const vmsReq = axios.get(
            `https://www.trafficengland.com/api/vms/getByJunctionInterval?road=${ road }&fromId=${startJunctionId}&toId=${endJunctionId}`,
        );

        const resp = await axios.all([eventsReq, cctvReq, vmsReq]);
        const eventData = resp[0].data;
        const cctvData = resp[1].data;
        const vmsData = resp[2].data;

        const data: RoadData = {
            road: road,
            primaryDirection: (Object.values(sections as any)[0] as any).primaryDirection,
            secondaryDirection: (Object.values(sections as any)[0] as any).secondaryDirection,
            primaryDirectionSections: [],
            secondaryDirectionSections: [],
            circularRoad: (Object.values(sections as any)[0] as any).circularRoad
        };

        for (const section of Object.values(sections)) {
            if ((section as any).junctionName === 'M60') continue;

            const primaryDirectionJunction: Junction = {
                name: (section as any).junctionName,
                destination: (section as any).primaryDirectionDescription
            };
            const secondaryDirectionJunction: Junction = {
                name: (section as any).junctionName,
                destination: (section as any).secondaryDirectionDescription
            };
            data.primaryDirectionSections.push(primaryDirectionJunction);
            data.secondaryDirectionSections.push(secondaryDirectionJunction);

            if ((section as any).primaryDownstreamJunctionSection) {
                const primaryDirectionSection: Section = {
                    id: (section as any).primaryDownstreamJunctionSection.id,
                    subsections: (section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.id }),
                    speed: (section as any).primaryDownstreamJunctionSection.avgSpeed,
                    length: (section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.length }).reduce((a: number, b: number) => a + b, 0),
                    speedLimits: Array.from(new Set((section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.speedLimit }).filter((x: number) => x != 70))),
                    data: []
                }

                const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
                    processEvents(eventData, primaryDirectionSection.subsections),
                    processCCTV(cctvData, primaryDirectionSection.subsections),
                    processVMS(vmsData, primaryDirectionSection.subsections)
                ]) as [Event[], CCTV[], VMSGroup[]];
                primaryDirectionSection.data.push(...promises[0]);
                primaryDirectionSection.data.push(...promises[1]);
                primaryDirectionSection.data.push(...promises[2]);

                primaryDirectionSection.data.sort(sort);

                data.primaryDirectionSections.push(primaryDirectionSection);
            }

            if ((section as any).secondaryUpstreamJunctionSection) {
                const secondaryDirectionSection: Section = {
                    id: (section as any).secondaryUpstreamJunctionSection.id,
                    subsections: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.id }),
                    speed: (section as any).secondaryUpstreamJunctionSection.avgSpeed,
                    length: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.length }).reduce((a: number, b: number) => a + b, 0),
                    speedLimits: Array.from(new Set((section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.speedLimit }).filter((x: number) => x != 70))),
                    data: []
                }
                
                const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
                    processEvents(eventData, secondaryDirectionSection.subsections),
                    processCCTV(cctvData, secondaryDirectionSection.subsections),
                    processVMS(vmsData, secondaryDirectionSection.subsections)
                ]) as [Event[], CCTV[], VMSGroup[]];
                secondaryDirectionSection.data.push(...promises[0]);
                secondaryDirectionSection.data.push(...promises[1]);
                secondaryDirectionSection.data.push(...promises[2]);

                secondaryDirectionSection.data.sort(sort);

                data.secondaryDirectionSections.push(secondaryDirectionSection);
            }
        }

        fs.writeFileSync(__dirname + `/../data/roads/${ road }.json`, JSON.stringify(data));
    }

    console.log('Finished Fetching Road Data');
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

app.listen(process.env.API_PORT, () => {
    console.log(`Server Listening on Port ${process.env.API_PORT}`);
});