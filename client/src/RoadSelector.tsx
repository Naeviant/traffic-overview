import React from 'react';
import {
    Box,
    FormControl, 
    InputLabel, 
    MenuItem,
    Select
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface RoadSelectorProps {
    width: string;
    road: string;
    roads: string[];
    setRoad: (e: any) => void;
}

function RoadSelector(props: RoadSelectorProps) {
    const { width, road, roads, setRoad } = props;

    return (
        <Box sx={{
            backgroundColor: '#111111',
            border: 'solid 2px #333333',
            borderRadius: '8px',
            width: width
        }}>
            <FormControl sx={{
                width: '100%'
            }}>
                <InputLabel id="road-input-label" sx={{
                    color: '#AAAAAA !important',
                }}>
                    Select Road
                </InputLabel>
                <Select
                    labelId="road-input-label"
                    id="road-input"
                    value={ road }
                    label="Road"
                    onChange={ setRoad }
                    sx={{
                        width: '100%',
                        color: '#AAAAAA'
                    }}
                >
                    {
                        roads.map((road, i) => (
                            <MenuItem
                                key={ road }
                                value={ road }
                                sx={{
                                    backgroundColor: '#111111 !important',
                                    color: '#AAAAAA',
                                    "&:hover": {
                                        backgroundColor: '#333333 !important',
                                    },
                                    marginTop: i === 0 ? '-8px' : 0,
                                    marginBottom: i === roads.length - 1 ? '-8px' : 0,
                                }}
                            >
                                { road }
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default RoadSelector;