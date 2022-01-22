import { Event } from "../types/RoadData";

export default function processEvents(eventData: any[], subsections: number[]) {
    return new Promise((resolve) => {
        const data: Event[] = [];

        for (const incident of eventData.filter(x => subsections.indexOf(x.linkId) > -1)) {
            if (data.map(x => { return x.payload.id; }).indexOf(incident.id) === -1) {
                const event: Event = {
                    interface: 'EVENT',
                    payload: {
                        id: incident.id,
                        type: incident.teEventType,
                        severity: incident.severity,
                        lat: incident.latitude,
                        long: incident.longitude,
                        startTimestamp: incident.overallStartDate,
                        endTimestamp: incident.overallEndDate,
                        lanes: incident.eventLanes,
                        reason: incident.formatDesc.length === 0 ? null : (incident.formatDesc.length === 5 ? incident.formatDesc[2].replace('Reason : ', '') : incident.formatDesc[1].replace('Reason : ', ''))
                    }
                };
                
                data.push(event);
            }
        }

        resolve(data);
    });
}