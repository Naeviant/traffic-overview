import { CCTV } from "../types/RoadData";

export default function processCCTV(cctvData: any[], subsections: number[]) {
    return new Promise((resolve) => {
        const data: CCTV[] = [];

        for (const cctv of cctvData.filter(x => subsections.indexOf(x.linkId) > -1)) {
            const camera: CCTV = {
                interface: 'CCTV',
                payload: {
                    id: (cctv as any).id,
                    description: (cctv as any).description,
                    lat: (cctv as any).latitude,
                    long: (cctv as any).longitude,
                    url: (cctv as any).url,
                    image: `https://public.highwaystrafficcameras.co.uk/cctvpublicaccess/images/${(cctv as any).url.replace('http://public.highwaystrafficcameras.co.uk/cctvpublicaccess/html/', '').replace('.html', '')}.jpg`,
                    available: (cctv as any).available
                }
            }
            
            data.push(camera);
        }

        resolve(data);
    });
}