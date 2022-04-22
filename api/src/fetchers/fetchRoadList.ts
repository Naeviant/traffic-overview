import axios from 'axios';
import fs from 'fs';

import { MotorwayList, ARoadList } from '../types/RoadList';

export default async function fetchRoadList() {
    const motorwaysResp = await axios.get('https://www.trafficengland.com/api/network/getMotorwayJunctions');
    const motorwaysData = motorwaysResp.data as MotorwayList;

    const motorways = Object.keys(motorwaysData);

    const aRoadResp = await axios.get('https://www.trafficengland.com/api/network/getMajorARoads');
    const aRoadData = aRoadResp.data as ARoadList[];

    const aRoads = aRoadData.map((r: ARoadList) => r.roadName);

    const roads = motorways.concat(aRoads);

    const chunkSize = roads.length / 5;
    for (let i = 0; i < roads.length; i += chunkSize) {
        fs.writeFileSync(`${__dirname}/../../data/roads${(i / chunkSize) + 1}.json`, JSON.stringify(roads.slice(i, i + chunkSize), null, 4));
    }
}
