import React from 'react';
import { Grid } from '@mui/material';

import Headers from './Headers';
import Junction from './Junction';
import Section from './Section';

interface RoadDataProps {
    primaryDirectionSections: any[];
    secondaryDirectionSections: any[];
    roadName: string;
    circularRoad: boolean;
    primaryDirection: string;
    secondaryDirection: string;
    refs: any;
}

function RoadData(props: RoadDataProps) {
    const {
        primaryDirectionSections,
        secondaryDirectionSections,
        roadName,
        circularRoad,
        primaryDirection,
        secondaryDirection,
        refs
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
                    section.interface === "JUNCTION"
                    ?
                        <Junction
                            key={index}
                            refs={refs}
                            junctionName={section.payload.name}
                            primaryDestination={section.payload.destination}
                            secondaryDestination={secondaryDirectionSections[secondaryDirectionSections.length - 1 - index].payload.destination}
                        />
                    : 
                        <Section 
                            key={index} 
                            primaryDirectionSection={section.payload} 
                            secondaryDirectionSection={secondaryDirectionSections[secondaryDirectionSections.length - 1 - index].payload}
                        />
                ))
            }
        </Grid>
    );
}

export default RoadData;