import express, { Request, Response } from 'express';
import cron from 'node-cron';
import axios, { Axios, AxiosResponse } from 'axios';
import fs, { rmSync } from 'fs';
import * as dotenv from 'dotenv';

import RoadList from './types/RoadList';

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