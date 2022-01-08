import express, { Request, Response } from 'express';
import cron from 'node-cron';
import axios, { Axios, AxiosResponse } from 'axios';
import fs, { rmSync } from 'fs';
import * as dotenv from 'dotenv';

import { RoadList } from './types/RoadList';
import { Junction, RoadData, Section } from './types/RoadData';

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
        const resp = await axios.get(`https://www.trafficengland.com/api/network/getJunctionSections?roadName=${ road }`);
        const sections = resp.data;

        const data: RoadData = {
            road: road,
            primaryDirection: (Object.values(sections as any)[0] as any).primaryDirection,
            secondaryDirection: (Object.values(sections as any)[0] as any).secondaryDirection,
            primaryDirectionSections: [],
            secondaryDirectionSections: [],
            circularRoad: (Object.values(sections as any)[0] as any).circularRoad
        };

        for (const section of Object.values(sections)) {
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
                    speedLimits: (section as any).primaryDownstreamJunctionSection.links.map((x: any) => { return x.speedLimit }),
                    data: []
                }

                data.primaryDirectionSections.push(primaryDirectionSection);
            }

            if ((section as any).secondaryUpstreamJunctionSection) {
                const secondaryDirectionSection: Section = {
                    id: (section as any).secondaryUpstreamJunctionSection.id,
                    subsections: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.id }),
                    speed: (section as any).secondaryUpstreamJunctionSection.avgSpeed,
                    length: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.length }).reduce((a: number, b: number) => a + b, 0),
                    speedLimits: (section as any).secondaryUpstreamJunctionSection.links.map((x: any) => { return x.speedLimit }).filter((x: number) => x != 70),
                    data: []
                }

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

app.listen(process.env.API_PORT, () => {
    console.log(`Server Listening on Port ${process.env.API_PORT}`);
});