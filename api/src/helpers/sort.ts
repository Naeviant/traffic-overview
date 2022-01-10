import { CCTV, Event, VMSGroup } from "../types/RoadData";

export default function sort(a: Event | CCTV | VMSGroup, b: Event | CCTV | VMSGroup) {
    if (Math.abs(a.lat - b.lat) > Math.abs(a.long - b.long)) {
        if (a.lat > b.lat) {
            return 1;
        }
        return -1;
    } else {
        if (a.long > b.long) {
            return 1;
        }
        return -1;
    }
};