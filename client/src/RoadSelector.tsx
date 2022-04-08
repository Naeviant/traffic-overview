import React from 'react';
import {
    Autocomplete,
    Box,
    Paper,
    TextField
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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
            <Autocomplete
                disablePortal
                freeSolo
                options={roads}
                PaperComponent={(props) => <Paper {...props} sx={{ backgroundColor: '#111111' }} />}
                ListboxProps={{ style: { maxHeight: '200px' }}}
                value={road}
                onChange={(e, value) => { if (value) setRoad(value) }}
                renderOption={(props, option) => {
                    return (
                        <span {...props} style={{ 
                            backgroundColor: '#111111',
                            color: '#AAAAAA'
                        }}>
                            {option}
                        </span>
                    );
                }}
                renderInput={(props) => <TextField className='road-selector' {...props} label="Road" InputLabelProps={{ sx: { color: '#AAAAAA !important' } }} />}
                clearIcon={<ClearIcon fontSize="small" sx={{ color: '#AAAAAA !important' }} />}
            />
        </Box>
    );
}

export default RoadSelector;