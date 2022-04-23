import React from 'react';

import {
    Grid,
    Paper,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';

interface AverageSpeedProps {
    speed: number;
}

function AverageSpeed(props: AverageSpeedProps) {
    const { speed } = props;

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
                    <SpeedIcon sx={{
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
                    Average Speed:
                    {' '}
                    { speed }
                    mph
                </Grid>
                <Grid
                    item
                    sx={{
                        display: {
                            xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none',
                        },
                    }}
                >
                    { speed }
                    mph
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AverageSpeed;
