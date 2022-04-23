import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button } from '@mui/material';

import RoadSelector from './RoadSelector';

import { show as showSidebar } from './state/showSidebar';

function MobileTopBar() {
    const dispatch = useDispatch();

    const colour = useSelector((state: any) => state.road.colour);

    return (
        <Box sx={{
            display: {
                xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none',
            },
            justifyContent: 'center',
            paddingTop: '16px',
            paddingBottom: '16px',
        }}
        >
            <Button
                variant="contained"
                onClick={() => dispatch(showSidebar())}
                sx={{
                    backgroundColor: colour === 'blue' ? '#01579b !important' : '#1b5e20 !important',
                    marginRight: '16px',
                }}
            >
                Menu
            </Button>
            <RoadSelector width="calc(100% - 112px)" />
        </Box>
    );
}

export default MobileTopBar;
