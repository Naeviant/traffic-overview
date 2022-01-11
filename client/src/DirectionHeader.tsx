import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';

interface DirectionHeaderProps {
    direction: string;
}

function DirectionHeader(props: DirectionHeaderProps) {
    const { direction } = props;

    return (
        <Paper sx={{ 
            backgroundColor: '#01579b', 
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