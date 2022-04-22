import React from 'react';

import { Grid } from '@mui/material';

import DirectionHeader from './DirectionHeader';
import RoadHeader from './RoadHeader';

interface HeadersProps {
    circularRoad: boolean;
    primaryDirection: string;
    roadName: string;
    secondaryDirection: string;
}

function Headers(props: HeadersProps) {
    const {
        roadName,
        circularRoad,
        primaryDirection,
        secondaryDirection,
    } = props;

    return (
        <>
            <Grid item xs={6} sm={5}>
                <DirectionHeader direction={primaryDirection} primary />
            </Grid>
            <Grid
                item
                sm={2}
                sx={{
                    display: {
                        xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',
                    },
                }}
            >
                <RoadHeader road={roadName} ringRoad={circularRoad} />
            </Grid>
            <Grid item xs={6} sm={5}>
                <DirectionHeader direction={secondaryDirection} primary={false} />
            </Grid>
        </>
    );
}

export default Headers;
