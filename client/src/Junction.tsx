import React from 'react';
import { Grid } from '@mui/material';

import JunctionHeader from './JunctionHeader';

interface JunctionProps {
    refs: any;
    junctionName: string;
    primaryDestination: string;
    secondaryDestination: string;
}

function Junction(props: JunctionProps) {
    const {
        refs,
        junctionName,
        primaryDestination,
        secondaryDestination
    } = props;

    return (
        <>
            <Grid item xs={6} sm={5}>
                <JunctionHeader text={ primaryDestination } />
            </Grid>
            <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                <JunctionHeader refs={(element: any) => refs.current.push(element)} text={ junctionName } arrows />
            </Grid>
            <Grid item xs={6} sm={5}>
                <JunctionHeader text={ secondaryDestination } />
            </Grid>
        </>
    )
}

export default Junction;