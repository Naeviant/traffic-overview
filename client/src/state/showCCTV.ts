import { createSlice } from '@reduxjs/toolkit';

export const showCCTVSlice = createSlice({
    name: 'showCCTV',
    initialState: true,
    reducers: {
        toggle: (state) => !state,
    },
});

export const { toggle } = showCCTVSlice.actions;
export default showCCTVSlice.reducer;
