import React from 'react';
import { Box, Button } from '@mui/material';

import RoadSelector from './RoadSelector';

interface MobileTopBarProps {
    road: string;
    roads: string[];
    setRoad(road: string): void;
    setShowSidebar(state: boolean): void;
}

function MobileTopBar(props: MobileTopBarProps) {
    const {
        road,
        roads,
        setRoad,
        setShowSidebar
    } = props;

    return (
        <Box sx={{
            display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' },
            justifyContent: "center",
            paddingTop: '16px',
            paddingBottom: '16px',
        }}>
            <Button variant="contained" onClick={ () => setShowSidebar(true) } sx={{ marginRight: '16px' }}>Menu</Button>
            <RoadSelector width="calc(100% - 112px)" road={ road } roads={ roads } setRoad={ setRoad } />
        </Box>
    )
}

export default MobileTopBar;