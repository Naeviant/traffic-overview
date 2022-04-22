import fs from 'fs';

import buildSection from "./buildSection";

import { APICCTV } from "../types/APICCTV";
import { APIEvent } from "../types/APIEvent";
import { APIRoads } from "../types/APIRoads";
import { APIVMSGroup } from "../types/APIVMS";
import { Junction, RoadData } from "../types/RoadData";

export default async function buildRoads(roads: string[], sections: APIRoads, apiData: (APIEvent[] | APICCTV[] | APIVMSGroup[])[]) {
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
                data.primaryDirectionSections.push(await buildSection(
                    section.primaryDownstreamJunctionSection,
                    apiData[0] as APIEvent[],
                    apiData[1] as APICCTV[],
                    apiData[2] as APIVMSGroup[]
                ));
            }

            if (section.secondaryUpstreamJunctionSection) {
                data.secondaryDirectionSections.push(await buildSection(
                    section.secondaryUpstreamJunctionSection,
                    apiData[0] as APIEvent[],
                    apiData[1] as APICCTV[],
                    apiData[2] as APIVMSGroup[]
                ));
            }
        }

        fs.writeFileSync(__dirname + `/../../data/roads/${ road }.json`, JSON.stringify(data, null, 4));
    }
}