import { CCTV, Event, VMSGroup } from "../types/RoadData";

export default function sort(a: Event | CCTV | VMSGroup, b: Event | CCTV | VMSGroup) {
    if (a.interface === 'EVENT') {
        return 0;
    }
    if (b.interface === 'EVENT') {
        return 0;
    }

    if (a.payload.linkId > b.payload.linkId) {
        return -1;
    }
    if (b.payload.linkId < a.payload.linkId) {
        return 1;
    }

    if (a.payload.chainage > b.payload.chainage) {
        return -1;
    }
    if (a.payload.chainage < b.payload.chainage) {
        return 1;
    }
    return 0;
};