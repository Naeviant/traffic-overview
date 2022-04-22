import React from 'react';
import { Typography } from '@mui/material';

interface DataFetchedTimestampProps {
    timestamp: number;
}

function DataFetchedTimestamp(props: DataFetchedTimestampProps) {
    const { timestamp } = props;

    if (!timestamp) {
        return null;
    }
    
    const formattedDateTime = (new Date(timestamp).toISOString().match(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/) ?? ['', '', ''])[2]

    return (
        <Typography 
            variant="caption" 
            align="center" 
            component="p" 
            sx={{ color: '#EEEEEE' }}
        >
            Data Fetched At: { formattedDateTime }
        </Typography>
    );
}

export default DataFetchedTimestamp;