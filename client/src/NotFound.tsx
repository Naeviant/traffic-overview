import React from 'react';
import { Box } from '@mui/material';

function NotFound() {
  return (
    <Box sx={{
      overflowY: 'auto',
      height: '100%',
      paddingTop: '20px',
      paddingBottom: '20px',
      textAlign: 'center'
    }}
    >
        <div>
          <h1 style={{ fontSize: '4rem' }}>Data Unavailable</h1>
          <p>No further information about this road was available.</p>
        </div>
    </Box>
  );
}

export default NotFound;