import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button } from '@mui/material';

import { unset as unsetRoad } from './state/road';

function NotFound() {
    const dispatch = useDispatch();

    return (
        <Box sx={{
            overflowY: 'auto',
            height: '100%',
            paddingTop: '20px',
            paddingBottom: '20px',
            textAlign: 'center',
        }}
        >
            <div>
                <h1 style={{ fontSize: '4rem' }}>Data Unavailable</h1>
                <p>No further information about this road was available.</p>
                <Button onClick={() => dispatch(unsetRoad())} sx={{ color: '#EEEEEE', textDecoration: 'underline' }}>Click here to go to the homepage.</Button>
            </div>
        </Box>
    );
}

export default NotFound;
