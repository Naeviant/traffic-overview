import React from 'react';
import {
    Box,
    FormControl, 
    InputLabel, 
    MenuItem,
    Select
} from '@mui/material';

interface RoadSelectorProps {
    road: string;
    roads: string[];
    setRoad: (e: any) => void;
}

function RoadSelector(props: RoadSelectorProps) {
    const { road, roads, setRoad } = props;

    return (
        <Box sx={{
            backgroundColor: '#FFFFFF',
            padding: 2,
            width: 'calc(100% - 32px)'
        }}>
            <FormControl sx={{
                width: '100%'
            }}>
                <InputLabel id="road-input-label">Road</InputLabel>
                <Select
                    labelId="road-input-label"
                    id="road-input"
                    value={ road }
                    label="Road"
                    onChange={ setRoad }
                    sx={{
                        width: '100%'
                    }}
                >
                    {
                        roads.map((road) => (
                            <MenuItem key={ road } value={ road }>{ road }</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default RoadSelector;