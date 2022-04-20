import { APICCTV } from "../types/APICCTV";
import { CCTV } from "../types/RoadData";

export default function processCCTV(cctvData: APICCTV[], subsections: number[]) {
    return new Promise((resolve) => {
        const data: CCTV[] = [];

        for (const cctv of cctvData.filter(x => subsections.indexOf(x.linkId) > -1)) {
            const camera: CCTV = {
                interface: 'CCTV',
                payload: {
                    id: cctv.id,
                    description: cctv.description,
                    lat: cctv.latitude,
                    long: cctv.longitude,
                    linkId: cctv.linkId,
                    chainage: cctv.chainage,
                    url: cctv.url,
                    image: `https://public.highwaystrafficcameras.co.uk/cctvpublicaccess/images/${cctv.url.replace('http://public.highwaystrafficcameras.co.uk/cctvpublicaccess/html/', '').replace('.html', '')}.jpg`,
                    available: cctv.available
                }
            }
            
            data.push(camera);
        }

        resolve(data);
    });
}