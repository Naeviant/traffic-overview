import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';

interface DirectionHeaderProps {
    direction: string;
    colour: string;
}

function DirectionHeader(props: DirectionHeaderProps) {
    const { direction, colour } = props;

    return (
        <Paper sx={{ 
            backgroundColor: colour === 'blue' ? '#01579b' : '#1b5e20', 
            color: '#FFFFFF',
            padding: 2,
            margin: 1,
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography align="center" variant="h4">{ direction }</Typography>
        </Paper>
    );
}

export default DirectionHeader;