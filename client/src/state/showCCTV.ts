import { createSlice } from '@reduxjs/toolkit';

export const showCCTVSlice = createSlice({
    name: 'showCCTV',
    initialState: true,
    reducers: {
        toggle: (state) => {
            return !state;
        }
    }
});

export const { toggle } = showCCTVSlice.actions;
export default showCCTVSlice.reducer;