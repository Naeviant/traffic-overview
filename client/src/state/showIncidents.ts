import { createSlice } from '@reduxjs/toolkit';

export const showIncidentsSlice = createSlice({
    name: 'showIncidents',
    initialState: true,
    reducers: {
        toggle: (state) => {
            return !state;
        }
    }
});

export const { toggle } = showIncidentsSlice.actions;
export default showIncidentsSlice.reducer;