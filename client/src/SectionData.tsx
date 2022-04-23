import React from 'react';
import { useSelector } from 'react-redux';

import AverageSpeed from './AverageSpeed';
import Distance from './Distance';
import CCTV from './CCTV';
import Event from './Event';
import VMS from './VMS';

interface SectionDataProps {
    data: any;
    reverse?: boolean;
}

function SectionData(props: SectionDataProps) {
    const { data, reverse } = props;

    const showSpeeds = useSelector((state: any) => state.showSpeeds);
    const showDistances = useSelector((state: any) => state.showDistances);
    const showCCTV = useSelector((state: any) => state.showCCTV);
    const showVMS = useSelector((state: any) => state.showVMS);
    const showIncidents = useSelector((state: any) => state.showIncidents);
    const showRoadworks = useSelector((state: any) => state.showRoadworks);

    const sectionData = !reverse ? data.data : [...data.data].reverse();

    return (
        <>
            {
                showSpeeds
                    ? <AverageSpeed speed={Math.round(data.speed)} />
                    : null
            }
            {
                showDistances
                    ? <Distance distance={data.length} />
                    : null
            }
            {
                [...sectionData].reverse().map((info: any) => (
                    info.interface === 'CCTV' && showCCTV
                        ? (
                            <CCTV
                                key={info.payload.id}
                                lat={info.payload.lat}
                                long={info.payload.long}
                                image={info.payload.image}
                                description={info.payload.description}
                            />
                        )
                        : info.interface === 'VMS' && showVMS
                            ? (
                                <VMS
                                    key={info.payload.address}
                                    lat={info.payload.lat}
                                    long={info.payload.long}
                                    vms={info.payload.vms}
                                    sig={info.payload.sig}
                                />
                            )
                            : info.interface === 'EVENT' && ((info.payload.type !== 'ROADWORKS' && showIncidents) || (info.payload.type === 'ROADWORKS' && showRoadworks))
                                ? (
                                    <Event
                                        key={info.payload.id}
                                        type={info.payload.type}
                                        reason={info.payload.reason}
                                        severity={info.payload.severity}
                                        lanes={info.payload.lanes}
                                    />
                                )
                                : null
                ))
            }
        </>
    );
}

export default SectionData;
