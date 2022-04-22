import React from 'react';
import { useDispatch } from 'react-redux'; 
import {
    Checkbox,
    FormControlLabel,
} from '@mui/material';

interface DataCheckboxProps {
    currentState: boolean;
    toggleState(): any;
    label: string;
}

function DataCheckbox(props: DataCheckboxProps) {
    const dispatch = useDispatch();

    const { currentState, toggleState, label } = props;

    return (
        <FormControlLabel 
            control={
                <Checkbox
                    checked={currentState} 
                    onChange={() => dispatch(toggleState())} 
                    sx={{ color: "#AAAAAA" }}
                />} 
            label={label}
        />
    );
}

export default DataCheckbox;