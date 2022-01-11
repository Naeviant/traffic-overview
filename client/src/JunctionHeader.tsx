import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';

interface JunctionHeaderProps {
    text: string;
}

function JunctionHeader(props: JunctionHeaderProps) {
    const { text } = props;

    return (
        <Paper sx={{ 
            backgroundColor: '#01579b', 
            color: '#FFFFFF',
            padding: 1,
            margin: 1
        }}>
            <Typography align="center" variant="h6">{ text }</Typography>
        </Paper>
    );
}

export default JunctionHeader;