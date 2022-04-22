import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const server = express();

server.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

server.get('/', (req: Request, res: Response) => {
    res.send({ status: 200, data: [] });
});

server.get('/roads', async (req: Request, res: Response) => {
    const roads1 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads1.json', 'utf8'));
    const roads2 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads2.json', 'utf8'));
    const roads3 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads3.json', 'utf8'));
    const roads4 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads4.json', 'utf8'));
    const roads5 = JSON.parse(fs.readFileSync(__dirname + '/../data/roads5.json', 'utf8'));

    res.send({ status: 200, data: roads1.concat(roads2, roads3, roads4, roads5) });
});

server.get('/timestamps/:road', async (req: Request, res: Response) => {
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

server.get('/road/:road', async (req: Request, res: Response) => {
    try {
        const road = fs.readFileSync(__dirname + `/../data/roads/${ req.params.road }.json`, 'utf8');

        res.send({ status: 200, data: JSON.parse(road) });
    } catch(e) {
        res.status(404).send({ status: 404, data: [] });
    }
});

server.get('/road/:road/historical/:timestamp', async (req: Request, res: Response) => {
    try {
        const road = fs.readFileSync(__dirname + `/../data/roads/historical/${ req.params.timestamp }/${ req.params.road }.json`, 'utf8');

        res.send({ status: 200, data: JSON.parse(road) });
    } catch(e) {
        res.status(404).send({ status: 404, data: [] });
    }
});

server.disable('etag');

export default server;