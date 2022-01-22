import { VMSGroup, VMS, SIG } from "../types/RoadData";

export default function processVMS(vmsData: any[], subsections: number[]) {
    return new Promise((resolve) => {
        const data: VMSGroup[] = [];

        for (const collection of vmsData.map(x => x.vmsList).filter(x => subsections.indexOf(x[0].linkId) > -1)) {
          let vms: VMS | null = null;
          if (collection[0].type === 'VMS') {
            vms = {
              address: collection[0].geogAddr,
              lat: collection[0].latitude,
              long: collection[0].longitude,
              rows: collection[0].rows,
              cols: collection[0].cols,
              message: collection[0].message
            }
          }

          const sig: SIG[] = collection.filter((x: any) => x.type === 'SIG' || x.type === 'AMI').map((x: any) => {
            return {
              address: x.geogAddr,
              lat: x.latitude,
              long: x.longitude,
              code: convertCode(Number(x.code)),
              type: x.genericType,
              slip: !['A', 'B'].some((s: string) => x.geogAddr.substr(x.geogAddr.length - 2).indexOf(s) > -1)
            }
          });

          const vmsGroup: VMSGroup = {
              interface: 'VMS',
              payload: {    
                  id: null,
                  address: collection[0].geogAddr.split('/')[0] + '/' + collection[0].geogAddr.split('/')[1].split('A')[0].split('B')[0].split('J')[0].split('K')[0].split('L')[0].split('M')[0],
                  vms: vms,
                  sig: sig,
                  lat: collection[0].latitude,
                  long: collection[0].longitude
              }
          };

          data.push(vmsGroup);
        }

        for (let i = 0; i < data.length - 1; i++) {
          if (data[i].payload.address === data[i + 1].payload.address) {
            data[i].payload.sig = data[i].payload.sig.concat(data[i + 1].payload.sig);
            data.splice(i + 1, 1);
            data[i].payload.sig.sort((a: any, b: any) => (a.slip === b.slip) ? 0 : a.slip ? -1 : 1);
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