import { CCTV } from "../types/RoadData";

export default function processCCTV(cctvData: any, subsections: number[]) {
    return new Promise((resolve) => {
        const data: CCTV[] = [];

        for (const cctv of Object.values(cctvData)) {
            if (subsections.indexOf((cctv as any)[0].linkId) > -1) {
                const camera: CCTV = {
                    interface: 'CCTV',
                    payload: {
                        id: (cctv as any)[0].id,
                        description: (cctv as any)[0].description,
                        lat: (cctv as any)[0].latitude,
                        long: (cctv as any)[0].longitude,
                        url: (cctv as any)[0].url,
                        image: `https://public.highwaystrafficcameras.co.uk/cctvpublicaccess/images/${(cctv as any)[0].url.replace('http://public.highwaystrafficcameras.co.uk/cctvpublicaccess/html/', '').replace('.html', '')}.jpg`,
                        available: (cctv as any)[0].available
                    }
                }
                
                data.push(camera);
            }
        }

        resolve(data);
    });
}