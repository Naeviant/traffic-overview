import React from 'react';
import {
    Box,
    FormGroup,
} from '@mui/material';

import DataCheckbox from './DataCheckbox';

interface DataCheckboxCollectionProps {
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

function DataCheckboxCollection(props: DataCheckboxCollectionProps) {
    const {
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
        <Box
            my={2}
            p={2}
            sx={{
                backgroundColor: '#111111',
                color: '#AAAAAA'
            }}
        >
            <FormGroup>
                <DataCheckbox 
                    currentState={currentSpeedsState}
                    toggleState={toggleSpeeds} 
                    label="Show Speeds" 
                />
                <DataCheckbox 
                    currentState={currentDistancesState}
                    toggleState={toggleDistances} 
                    label="Show Distances" 
                />
                <DataCheckbox 
                    currentState={currentCCTVState}
                    toggleState={toggleCCTV} 
                    label="Show CCTV" 
                />
                <DataCheckbox 
                    currentState={currentVMSState}
                    toggleState={toggleVMS} 
                    label="Show VMS" 
                />
                <DataCheckbox 
                    currentState={currentIncidentsState}
                    toggleState={toggleIncidents} 
                    label="Show Incidents" 
                />
                <DataCheckbox 
                    currentState={currentRoadworksState}
                    toggleState={toggleRoadworks} 
                    label="Show Roadworks" 
                />
            </FormGroup>
        </Box>
    );
}

export default DataCheckboxCollection;