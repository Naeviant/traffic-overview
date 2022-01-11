import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';

interface RoadHeaderProps {
    road: string;
    ringRoad: boolean;
}

function RoadHeader(props: RoadHeaderProps) {
    const { road, ringRoad } = props;

    return (
        <Paper sx={{ 
            backgroundColor: '#01579b', 
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