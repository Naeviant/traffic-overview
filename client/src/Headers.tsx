import React from 'react';
import { Grid } from '@mui/material';

import DirectionHeader from './DirectionHeader';
import RoadHeader from './RoadHeader';

interface HeadersProps {
    colour: string;
    roadName: string;
    circularRoad: boolean;
    primaryDirection: string;
    secondaryDirection: string;
}

function Headers(props: HeadersProps) {
    const {
        colour,
        roadName,
        circularRoad,
        primaryDirection,
        secondaryDirection
    } = props;

    return (
        <>
            <Grid item xs={6} sm={5}>
                <DirectionHeader direction={ primaryDirection } colour={colour} primary={true} />
            </Grid>
            <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                <RoadHeader road={ roadName } ringRoad={ circularRoad } colour={colour} />
            </Grid>
            <Grid item xs={6} sm={5}>
                <DirectionHeader direction={ secondaryDirection } colour={colour} primary={false} />
            </Grid>
        </>
    );
}

export default Headers;