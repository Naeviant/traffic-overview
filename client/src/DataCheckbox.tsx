import React from 'react';
import { useDispatch } from 'react-redux';

import {
    Checkbox,
    FormControlLabel,
} from '@mui/material';

interface DataCheckboxProps {
    currentState: boolean;
    label: string;
    toggleState(): any;
}

function DataCheckbox(props: DataCheckboxProps) {
    const dispatch = useDispatch();

    const { currentState, toggleState, label } = props;

    return (
        <FormControlLabel
            control={(
                <Checkbox
                    checked={currentState}
                    onChange={() => dispatch(toggleState())}
                    sx={{ color: '#AAAAAA' }}
                />
            )}
            label={label}
        />
    );
}

export default DataCheckbox;
