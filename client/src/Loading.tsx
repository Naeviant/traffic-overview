import React from 'react';
import { Box, LinearProgress } from '@mui/material';

function Loading() {
    return (
        <Box sx={{
            overflowY: 'auto',
            height: '100%',
            padding: '20px',
            textAlign: 'center',
        }}
        >
            <div>
                <h1 style={{ fontSize: '4rem' }}>Loading</h1>
                <LinearProgress />
            </div>
        </Box>
    );
}

export default Loading;
