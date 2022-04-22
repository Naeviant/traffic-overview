import buildSectionData from "./buildSectionData";
import processCCTV from "./processCCTV";
import processEvents from "./processEvents";
import processVMS from "./processVMS";

import { APIJunctionSection } from "../types/APIRoads";
import { APICCTV } from "../types/APICCTV";
import { APIEvent } from "../types/APIEvent";
import { APIVMSGroup } from "../types/APIVMS";
import { CCTV } from "../types/RoadData";
import { Event } from "../types/RoadData";
import { Section } from "../types/RoadData";
import { VMSGroup } from "../types/RoadData";

export default async function buildSection(section: APIJunctionSection, apiEventData: APIEvent[], apiCCTVData: APICCTV[], apiVMSData: APIVMSGroup[]) {
    const sectionData: Section = {
        interface: 'SECTION',
        payload: {
            id: section.id,
            subsections: Array.isArray(section.links) ? section.links.map((x) => { return x.id }) : [],
            speed: section.avgSpeed,
            length: Array.isArray(section.links) ? section.links.map((x) => { return x.length }).reduce((a: number, b: number) => a + b, 0) : 0,
            speedLimits: Array.isArray(section.links) ? Array.from(new Set(section.links.map((x) => { return x.speedLimit }).filter((x: number) => x != 70))) : [],
            data: []
        }
    }
    
    const promises: [Event[], CCTV[], VMSGroup[]] = await Promise.all([
        processEvents(apiEventData as APIEvent[], sectionData.payload.subsections),
        processCCTV(apiCCTVData as APICCTV[], sectionData.payload.subsections),
        processVMS(apiVMSData as APIVMSGroup[], sectionData.payload.subsections)
    ]) as [Event[], CCTV[], VMSGroup[]];

    sectionData.payload.data = buildSectionData(sectionData.payload.subsections, promises[0], promises[1], promises[2], 'PRIMARY');

    return sectionData;
}