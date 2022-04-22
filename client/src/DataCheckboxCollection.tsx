import React from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    FormGroup,
} from '@mui/material';

import DataCheckbox from './DataCheckbox';

import { toggle as toggleSpeeds } from './state/showSpeeds';
import { toggle as toggleDistances } from './state/showDistances';
import { toggle as toggleCCTV } from './state/showCCTV';
import { toggle as toggleVMS } from './state/showVMS';
import { toggle as toggleIncidents } from './state/showIncidents';
import { toggle as toggleRoadworks } from './state/showRoadworks';

function DataCheckboxCollection() {
    const showSpeeds = useSelector((state: any) => state.showSpeeds);
    const showDistances = useSelector((state: any) => state.showDistances);
    const showCCTV = useSelector((state: any) => state.showCCTV);
    const showVMS = useSelector((state: any) => state.showVMS);
    const showIncidents = useSelector((state: any) => state.showIncidents);
    const showRoadworks = useSelector((state: any) => state.showRoadworks);

    return (
        <Box
            my={2}
            p={2}
            sx={{
                backgroundColor: '#111111',
                color: '#AAAAAA',
            }}
        >
            <FormGroup>
                <DataCheckbox
                    currentState={showSpeeds}
                    toggleState={toggleSpeeds}
                    label="Show Speeds"
                />
                <DataCheckbox
                    currentState={showDistances}
                    toggleState={toggleDistances}
                    label="Show Distances"
                />
                <DataCheckbox
                    currentState={showCCTV}
                    toggleState={toggleCCTV}
                    label="Show CCTV"
                />
                <DataCheckbox
                    currentState={showVMS}
                    toggleState={toggleVMS}
                    label="Show VMS"
                />
                <DataCheckbox
                    currentState={showIncidents}
                    toggleState={toggleIncidents}
                    label="Show Incidents"
                />
                <DataCheckbox
                    currentState={showRoadworks}
                    toggleState={toggleRoadworks}
                    label="Show Roadworks"
                />
            </FormGroup>
        </Box>
    );
}

export default DataCheckboxCollection;
