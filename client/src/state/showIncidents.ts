import { createSlice } from '@reduxjs/toolkit';

export const showIncidentsSlice = createSlice({
    name: 'showIncidents',
    initialState: true,
    reducers: {
        toggle: (state) => !state,
    },
});

export const { toggle } = showIncidentsSlice.actions;
export default showIncidentsSlice.reducer;
