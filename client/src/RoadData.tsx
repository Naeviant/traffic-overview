import React from 'react';

import { Grid } from '@mui/material';

import Headers from './Headers';
import Junction from './Junction';
import Section from './Section';

interface RoadDataProps {
    circularRoad: boolean;
    primaryDirection: string;
    primaryDirectionSections: any[];
    refs: any;
    roadName: string;
    secondaryDirection: string;
    secondaryDirectionSections: any[];
}

function RoadData(props: RoadDataProps) {
    const {
        primaryDirectionSections,
        secondaryDirectionSections,
        roadName,
        circularRoad,
        primaryDirection,
        secondaryDirection,
        refs,
    } = props;

    return (
        <Grid container spacing={1}>
            <Headers
                roadName={roadName}
                circularRoad={circularRoad}
                primaryDirection={primaryDirection}
                secondaryDirection={secondaryDirection}
            />
            {
                [...primaryDirectionSections].reverse().map((section: any, index: number) => (
                    section.interface === 'JUNCTION'
                        ? (
                            <Junction
                                key={index}
                                refs={refs}
                                junctionName={section.payload.name}
                                primaryDestination={section.payload.destination}
                                // eslint-disable-next-line max-len
                                secondaryDestination={secondaryDirectionSections[secondaryDirectionSections.length - 1 - index].payload.destination}
                            />
                        )
                        : (
                            <Section
                                key={index}
                                primaryDirectionSection={section.payload}
                                // eslint-disable-next-line max-len
                                secondaryDirectionSection={secondaryDirectionSections[secondaryDirectionSections.length - 1 - index].payload}
                            />
                        )
                ))
            }
        </Grid>
    );
}

export default RoadData;
