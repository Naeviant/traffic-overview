import React from 'react';
import {
    Checkbox,
    FormControlLabel,
} from '@mui/material';

interface DataCheckboxProps {
    currentState: boolean;
    toggleState(state: boolean): void;
    label: string;
}

function DataCheckbox(props: DataCheckboxProps) {
    const { currentState, toggleState, label } = props;

    return (
        <FormControlLabel 
            control={
                <Checkbox
                    checked={currentState} 
                    onChange={() => toggleState(!currentState)} 
                    sx={{ color: "#AAAAAA" }}
                />} 
            label={label}
        />
    );
}

export default DataCheckbox;