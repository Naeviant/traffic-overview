import { createSlice } from '@reduxjs/toolkit';

export const showRoadworksSlice = createSlice({
    name: 'showRoadworks',
    initialState: true,
    reducers: {
        toggle: (state) => {
            return !state;
        }
    }
});

export const { toggle } = showRoadworksSlice.actions;
export default showRoadworksSlice.reducer;