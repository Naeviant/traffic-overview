import { CCTV, Event, VMSGroup } from "../types/RoadData";

export default function build(subsections: number[], events: Event[], cctv: CCTV[], vms: VMSGroup[], direction: 'PRIMARY' | 'SECONDARY'): (Event | CCTV | VMSGroup)[] {
    const data: (Event | CCTV | VMSGroup)[] = [];

    for (const subsection of subsections) {
        const subsectionData: (CCTV | VMSGroup)[] = [];
        subsectionData.push(...cctv.filter(c => c.payload.linkId === subsection));
        subsectionData.push(...vms.filter(c => c.payload.linkId === subsection));
        subsectionData.sort((a, b) => a.payload.chainage < b.payload.chainage ? 1 : -1);
        subsectionData.reverse();
        data.push(...subsectionData);      
    }

    if (direction === 'PRIMARY') {
        data.push(...events);
    } else {
        data.unshift(...events);
    }

    return data;
};