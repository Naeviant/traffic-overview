import React from 'react';
import {
    Paper,
    Grid,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface DistanceProps {
    distance: number;
}

function Distance(props: DistanceProps) {
    const { distance } = props;

    return (
        <Paper sx={{
            padding: 1,
            margin: 1,
            width: 'calc(100% - 32px);',
            backgroundColor: '#111111',
            color: '#AAAAAA',
        }}
        >
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <DirectionsCarIcon sx={{
                        paddingRight: 2,
                        position: 'relative',
                        top: '2px',
                    }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: {
                            xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',
                        },
                    }}
                >
                    Distance:
                    {' '}
                    { distance }
                    m
                </Grid>
                <Grid
                    item
                    sx={{
                        display: {
                            xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none',
                        },
                    }}
                >
                    { distance }
                    m
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Distance;
