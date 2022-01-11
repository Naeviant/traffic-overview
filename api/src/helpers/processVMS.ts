import { VMSGroup, VMS, SIG } from "../types/RoadData";

export default function processVMS(vmsData: any, subsections: number[]) {
    return new Promise((resolve) => {
        const data: VMSGroup[] = [];

        for (const subsection of subsections) {
            if (Object.keys(vmsData).indexOf(subsection.toString()) > -1) {
                const locations = new Set(Object.keys(vmsData[subsection.toString()]).map((x) => { return x.substring(0, x.length - 1) }));
                locations.forEach((location: string) => {
                    const vmsGroup: VMSGroup = {
                        interface: 'VMS',
                        payload: {    
                            id: null,
                            address: location,
                            vms: null,
                            sig: [],
                            lat: 0,
                            long: 0
                        }
                    };
                    for (const group of Object.keys(vmsData[subsection.toString()])) {
                        if (group.indexOf(location) > -1) {
                            for (const vms of vmsData[subsection.toString()][(group as string)].vmsList) {
                                if (!vmsGroup.payload.lat) {
                                    vmsGroup.payload.lat = vms.latitude;
                                    vmsGroup.payload.long = vms.longitude;
                                }
                                if (vms.type === 'VMS') {
                                    const info: VMS = {
                                        address: vms.geogAddr,
                                        lat: vms.latitude,
                                        long: vms.longitude,
                                        rows: vms.rows,
                                        cols: vms.cols,
                                        message: vms.message
                                    };
                                    vmsGroup.payload.vms = info;
                                } else if (vms.type === 'SIG') {
                                    const sig: SIG = {
                                        address: vms.geogAddr,
                                        lat: vms.latitude,
                                        long: vms.longitude,
                                        code: convertCode(Number(vms.code)),
                                        type: vms.genericType,
                                        slip: !['A', 'B'].some((s: string) => vms.geogAddr.substr(vms.geogAddr.length - 2).indexOf(s) > -1)
                                    };
                                    vmsGroup.payload.sig.push(sig);
                                    vmsGroup.payload.sig.sort((a: any, b: any) => (a.slip === b.slip) ? 0 : a.slip ? -1 : 1);
                                }
                            }
                        }
                    }
                    data.push(vmsGroup);
                });
            }
        }

        resolve(data);
    });
}

function convertCode(code: number): string {
    switch(code) {
      case 2:
        return 'NATIONAL_SPEED_LIMIT';
      case 3:
        return 'END_OF_RESTRICTIONS';
      case 4:
        return 'LANE_CLOSED';
      case 5:
        return 'SPEED_LIMIT_20';
      case 6:
        return 'SPEED_LIMIT_30';
      case 7:
        return 'SPEED_LIMIT_40';
      case 8:
        return 'SPEED_LIMIT_50';
      case 9:
        return 'SPEED_LIMIT_60';
      case 10:
        return 'SPEED_LIMIT_70';
      case 11:
        return 'SPEED_LIMIT_80';
      case 12:
        return 'SPEED_LIMIT_100';
      case 13:
        return 'SPEED_LIMIT_120';
      case 14:
        return 'MOVE_RIGHT';
      case 15:
        return 'DO_NOT_USE_HARDSHOULDER';
      case 16:
        return 'MOVE_LEFT';
      case 17:
        return 'LEAVE_AT_NEXT_EXIT_ON_LEFT';
      case 21:
        return 'LANE_1_CLOSED_LANE_2_OPEN';
      case 22:
        return 'LANE_1_OPEN_LANE_2_CLOSED';
      case 23:
        return 'LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_OPEN';
      case 24:
        return 'LANE_1_CLOSED_LANE_2_OPEN_LANE_3_OPEN';
      case 25:
        return 'LANE_1_OPEN_LANE_2_CLOSED_LANE_3_CLOSED';
      case 26:
        return 'LANE_1_OPEN_LANE_2_OPEN_LANE_3_CLOSED';
      case 27:
        return 'LANE_OPEN_WHITE';
      case 28:
        return 'LEAVE_AT_NEXT_EXIT_ON_RIGHT';
      case 29:
        return 'FOG';
      case 30:
        return 'QUEUE';
      case 31:
        return 'LANE_1_OPEN_LANE_2_OPEN_LANE_3_OPEN_LANE_4_CLOSED';
      case 32:
        return 'LANE_1_OPEN_LANE_2_OPEN_LANE_3_CLOSED_LANE_4_CLOSED';
      case 33:
        return 'LANE_1_OPEN_LANE_2_CLOSED_LANE_3_CLOSED_LANE_4_CLOSED';
      case 34:
        return 'LANE_1_CLOSED_LANE_2_OPEN_LANE_3_OPEN_LANE_4_OPEN';
      case 35:
        return 'LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_OPEN_LANE_4_OPEN';
      case 36:
        return 'LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_CLOSED_LANE_4_OPEN';
      case 37:
        return 'SMART_SPEED_LIMIT_20';
      case 38:
        return 'SMART_SPEED_LIMIT_30';
      case 39:
        return 'SMART_SPEED_LIMIT_40';
      case 40:
        return 'SMART_SPEED_LIMIT_50';
      case 41:
        return 'SMART_SPEED_LIMIT_60';
      case 42:
        return 'SMART_SPEED_LIMIT_70';
      case 43:
        return 'SMART_SPEED_LIMIT_80';
      case 44:
        return 'SMART_SPEED_LIMIT_100';
      case 45:
        return 'SMART_SPEED_LIMIT_120';
      case 55:
        return 'LANE_1_CLOSED';
      case 56:
        return 'LANE_1_CLOSED_LANE_2_CLOSED';
      case 57:
        return 'LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_CLOSED';
      case 58:
        return 'LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_CLOSED_LANE_4_CLOSED';
      case 60:
        return 'LANE_OPEN_GREEN';
      case 61:
        return 'NATIONAL_SPEED_LIMIT';
      case 62:
        return 'END_OF_RESTRICTIONS';
      default:
        return 'BLANK';
    }
}