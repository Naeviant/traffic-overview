import React from 'react';
import { SwipeableDrawer } from '@mui/material';

import MenuContent from './MenuContent';

interface MobileSidebarBarProps {
    showSidebar: boolean;
    setShowSidebar(state: boolean): void;
    road: string;
    roads: string[];
    setRoad(newState: string): void;
    unsetRoad(): void;
    refresh(): void;
    dataTimestamp: number;
    currentSpeedsState: boolean;
    currentDistancesState: boolean;
    currentCCTVState: boolean;
    currentVMSState: boolean;
    currentIncidentsState: boolean;
    currentRoadworksState: boolean;
    toggleSpeeds(newState: boolean): void;
    toggleDistances(newState: boolean): void;
    toggleCCTV(newState: boolean): void;
    toggleVMS(newState: boolean): void;
    toggleIncidents(newState: boolean): void;
    toggleRoadworks(newState: boolean): void;
}

function MobileSidebarBar(props: MobileSidebarBarProps) {
    const {
        showSidebar,
        setShowSidebar,
        road,
        roads,
        setRoad,
        unsetRoad,
        refresh,
        dataTimestamp,
        currentSpeedsState,
        currentDistancesState,
        currentCCTVState,
        currentVMSState,
        currentIncidentsState,
        currentRoadworksState,
        toggleSpeeds,
        toggleDistances,
        toggleCCTV,
        toggleVMS,
        toggleIncidents,
        toggleRoadworks
    } = props;

    return (
        <SwipeableDrawer
            anchor="left"
            open={showSidebar}
            onOpen={() => setShowSidebar(true)}
            onClose={() => setShowSidebar(false)}
            PaperProps={{ sx: { backgroundColor: '#222222', padding: '8px' } }}
        >
            <MenuContent
                road={road}
                roads={roads}
                setRoad={setRoad}
                unsetRoad={unsetRoad}
                refresh={refresh}
                dataTimestamp={dataTimestamp}
                toggleSidebar={setShowSidebar}
                currentSpeedsState={currentSpeedsState}
                currentDistancesState={currentDistancesState}
                currentCCTVState={currentCCTVState}
                currentVMSState={currentVMSState}
                currentIncidentsState={currentIncidentsState}
                currentRoadworksState={currentRoadworksState}
                toggleSpeeds={toggleSpeeds}
                toggleDistances={toggleDistances}
                toggleCCTV={toggleCCTV}
                toggleVMS={toggleVMS}
                toggleIncidents={toggleIncidents}
                toggleRoadworks={toggleRoadworks}
            />
        </SwipeableDrawer>
    );
}

export default MobileSidebarBar;