import React from 'react';
import {
    Button,
    Grid,
} from '@mui/material';

import DataCheckboxCollection from './DataCheckboxCollection';
import DataFetchedTimestamp from './DataFetchedTimestamp';
import RoadSelector from './RoadSelector';

interface MenuContentProps {
    road: string;
    roads: string[];
    setRoad(newState: string): void;
    unsetRoad(): void;
    refresh(): void;
    dataTimestamp: number;
    toggleSidebar(state: boolean): void;
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

function MenuContent(props: MenuContentProps) {
    const {
        road,
        roads,
        setRoad,
        unsetRoad,
        refresh,
        dataTimestamp,
        toggleSidebar,
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
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={ () => { unsetRoad(); toggleSidebar(false); } } fullWidth sx={{ paddingTop: '16px', paddingBottom: '16px', marginBottom: '16px' }}>Home</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={ () => { refresh(); toggleSidebar(false); } } fullWidth sx={{ paddingTop: '16px', paddingBottom: '16px', marginBottom: '16px' }}>Refresh</Button>
                </Grid>
            </Grid>
            <RoadSelector width="100%" road={ road } roads={ roads } setRoad={ setRoad } />
            <br />
            <DataFetchedTimestamp timestamp={dataTimestamp} />
            <DataCheckboxCollection 
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
        </>
    );
}

export default MenuContent;