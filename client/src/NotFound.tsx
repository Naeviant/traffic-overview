import React from 'react';
import { Box, Button } from '@mui/material';

interface NotFoundProps {
  unsetRoad(e: any): void;
}

function NotFound(props: NotFoundProps) {
  const { unsetRoad } = props;

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
          <Button onClick={unsetRoad} sx={{ color: '#EEEEEE', textDecoration: 'underline' }}>Click here to go to the homepage.</Button>
        </div>
    </Box>
  );
}

export default NotFound;