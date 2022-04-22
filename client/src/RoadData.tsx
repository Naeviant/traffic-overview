import React from 'react';
import { Grid } from '@mui/material';

import Headers from './Headers';
import Junction from './Junction';
import Section from './Section';

interface RoadDataProps {
    primaryDirectionSections: any[];
    secondaryDirectionSections: any[];
    colour: string;
    roadName: string;
    circularRoad: boolean;
    primaryDirection: string;
    secondaryDirection: string;
    refs: any;
    showSpeeds: boolean;
    showDistances: boolean;
    showCCTV: boolean;
    showVMS: boolean;
    showIncidents: boolean;
    showRoadworks: boolean;
}

function RoadData(props: RoadDataProps) {
    const {
        primaryDirectionSections,
        secondaryDirectionSections,
        colour,
        roadName,
        circularRoad,
        primaryDirection,
        secondaryDirection,
        refs,
        showSpeeds,
        showDistances,
        showCCTV,
        showVMS,
        showIncidents,
        showRoadworks
    } = props;

    return (
        <Grid container spacing={1}>
            <Headers 
                colour={colour}
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
                            colour={colour}
                            junctionName={section.payload.name}
                            primaryDestination={section.payload.destination}
                            secondaryDestination={secondaryDirectionSections[secondaryDirectionSections.length - 1 - index].payload.destination}
                        />
                    : 
                        <Section 
                            key={index} 
                            primaryDirectionSection={section.payload} 
                            secondaryDirectionSection={secondaryDirectionSections[secondaryDirectionSections.length - 1 - index].payload}
                            showSpeeds={showSpeeds}
                            showDistances={showDistances}
                            showCCTV={showCCTV}
                            showVMS={showVMS}
                            showIncidents={showIncidents}
                            showRoadworks={showRoadworks}
                        />
                ))
            }
        </Grid>
    );
}

export default RoadData;