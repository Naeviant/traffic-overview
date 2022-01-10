import { CCTV, Event, VMSGroup } from "../types/RoadData";

export default function sort(a: Event | CCTV | VMSGroup, b: Event | CCTV | VMSGroup) {
    if (Math.abs(a.payload.lat - b.payload.lat) > Math.abs(a.payload.long - b.payload.long)) {
        if (a.payload.lat > b.payload.lat) {
            return 1;
        }
        return -1;
    } else {
        if (a.payload.long > b.payload.long) {
            return 1;
        }
        return -1;
    }
};