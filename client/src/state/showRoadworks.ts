import { createSlice } from '@reduxjs/toolkit';

export const showRoadworksSlice = createSlice({
    name: 'showRoadworks',
    initialState: true,
    reducers: {
        toggle: (state) => !state,
    },
});

export const { toggle } = showRoadworksSlice.actions;
export default showRoadworksSlice.reducer;
