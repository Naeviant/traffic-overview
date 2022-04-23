import axios, { AxiosResponse } from 'axios';

import archiveData from '../helpers/archiveData';
import buildRoads from '../helpers/buildRoads';

import { APICCTV } from '../types/APICCTV';
import { APIEvent } from '../types/APIEvent';
import { APIRoads } from '../types/APIRoads';
import { APIVMSGroup } from '../types/APIVMS';

export default async function fetchRoadData(roads: string[]) {
    if (process.env.API_STOP_FETCH && process.env.API_STOP_FETCH !== 'FALSE') return;

    archiveData(roads);

    const sectionsReq: Promise<AxiosResponse>[] = roads.map((x: string) => axios.get(`https://www.trafficengland.com/api/network/getJunctionSections?roadName=${x}`));
    const sectionsRes: AxiosResponse[] = await axios.all(sectionsReq);

    // eslint-disable-next-line max-len
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
        ),
    ];
    // eslint-disable-next-line max-len
    const dataRes: (APIEvent[] | APICCTV[] | APIVMSGroup[])[] = (await axios.all(dataReq)).map((x: AxiosResponse) => x.data);

    await buildRoads(roads, sections, dataRes);
}
