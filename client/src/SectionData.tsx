import React from 'react';

import AverageSpeed from './AverageSpeed';
import Distance from './Distance';
import CCTV from './CCTV';
import Event from './Event';
import VMS from './VMS';

interface SectionDataProps {
    data: any;
    showSpeeds: boolean;
    showDistances: boolean;
    showCCTV: boolean;
    showVMS: boolean;
    showIncidents: boolean;
    showRoadworks: boolean;
}

function SectionData(props: SectionDataProps) {
    const { 
        data,
        showSpeeds,
        showDistances,
        showCCTV,
        showVMS,
        showIncidents,
        showRoadworks
    } = props;

    return (
        <>
            {
                showSpeeds
                ? <AverageSpeed speed={ Math.round(data.speed)} />
                : null
            }
            {
                showDistances
                ? <Distance distance={ data.length} />
                : null
            }
            {
                [...data.data].reverse().map((info: any) => (
                    info.interface === "CCTV" && showCCTV
                    ? 
                        <CCTV key={ info.payload.id } lat={ info.payload.lat } long={ info.payload.long } image={ info.payload.image } description={ info.payload.description } />
                    : info.interface === "VMS" && showVMS
                        ?
                            <VMS key={ info.payload.address } lat={ info.payload.lat } long={ info.payload.long } vms={ info.payload.vms } sig={ info.payload.sig } />
                        : info.interface === "EVENT" && ((info.payload.type !== "ROADWORKS" && showIncidents) || (info.payload.type === "ROADWORKS" && showRoadworks))
                            ?
                                <Event key={ info.payload.id } type={ info.payload.type } reason={ info.payload.reason } severity={ info.payload.severity } lanes={ info.payload.lanes } />
                            : <></>
                ))
            }
        </>
    );
}

export default SectionData;