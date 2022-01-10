import { VMSGroup, VMS, SIG, SIGCode } from "../types/RoadData";

export default function processVMS(vmsData: any, subsections: number[]) {
    return new Promise((resolve) => {
        const data: VMSGroup[] = [];

        for (const subsection of subsections) {
            if (Object.keys(vmsData).indexOf(subsection.toString()) > -1) {
                const locations = new Set(Object.keys(vmsData[subsection.toString()]).map((x) => { return x.substring(0, x.length - 1) }));
                locations.forEach((location: string) => {
                    const vmsGroup: VMSGroup = {
                        id: null,
                        address: location,
                        vms: null,
                        sig: [],
                        lat: 0,
                        long: 0
                    };
                    for (const group of Object.keys(vmsData[subsection.toString()])) {
                        if (group.indexOf(location) > -1) {
                            for (const vms of vmsData[subsection.toString()][(group as string)].vmsList) {
                                if (!vmsGroup.lat) {
                                    vmsGroup.lat = vms.latitude;
                                    vmsGroup.long = vms.longitude;
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
                                    vmsGroup.vms = info;
                                } else if (vms.type === 'SIG') {
                                    const sig: SIG = {
                                        address: vms.geogAddr,
                                        lat: vms.latitude,
                                        long: vms.longitude,
                                        code: SIGCode[Number(vms.code)],
                                        slip: !['A', 'B'].some((s: string) => vms.geogAddr.substr(vms.geogAddr.length - 2).indexOf(s) > -1)
                                    };
                                    vmsGroup.sig.push(sig);
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