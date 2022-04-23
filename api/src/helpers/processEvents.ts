import { APIEvent } from '../types/APIEvent';
import { Event } from '../types/RoadData';

export default function processEvents(eventData: APIEvent[], subsections: number[]) {
    return new Promise((resolve) => {
        const data: Event[] = [];

        // eslint-disable-next-line max-len
        for (const incident of eventData.filter((x: any) => x.linkIds.some((y: any) => subsections.indexOf(y) > -1))) {
            if (data.map((x) => x.payload.id).indexOf(incident.id) === -1) {
                // eslint-disable-next-line max-len
                if (incident.periods.some((x: any) => x.startPeriod < Date.now() && x.endPeriod > Date.now())) {
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
                            reason: incident.formatDesc.length === 0 ? null : (incident.formatDesc.length === 5 ? incident.formatDesc[2].replace('Reason : ', '') : incident.formatDesc[1].replace('Reason : ', '')),
                        },
                    };

                    data.push(event);
                }
            }
        }

        resolve(data);
    });
}
