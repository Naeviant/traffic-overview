import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';

interface RoadHeaderProps {
    road: string;
    ringRoad: boolean;
    colour: string;
}

function RoadHeader(props: RoadHeaderProps) {
    const { road, ringRoad, colour } = props;

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
            alignItems: 'center'
        }}>
            <Typography align="center" variant="h3">{ road }</Typography>
            {
                ringRoad 
                ? <Typography variant="caption">Ring Road</Typography>
                : <></>
            }
        </Paper>
    );
}

export default RoadHeader;