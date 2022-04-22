import React from 'react';
import { useSelector } from 'react-redux';

import {
    Paper,
    Typography,
} from '@mui/material';

interface RoadHeaderProps {
    ringRoad: boolean;
    road: string;
}

function RoadHeader(props: RoadHeaderProps) {
    const { road, ringRoad } = props;

    const colour = useSelector((state: any) => state.road.colour);

    return (
        <Paper sx={{
            backgroundColor: colour === 'blue' ? '#01579b' : '#1b5e20',
            color: '#FFFFFF',
            padding: 2,
            margin: 1,
            height: 80,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <Typography align="center" variant="h3">{ road }</Typography>
            {
                ringRoad
                    ? <Typography variant="caption">Ring Road</Typography>
                    : null
            }
        </Paper>
    );
}

export default RoadHeader;
