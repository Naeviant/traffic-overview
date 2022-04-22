import { createSlice } from '@reduxjs/toolkit';

export const showSpeedsSlice = createSlice({
    name: 'showSpeeds',
    initialState: true,
    reducers: {
        toggle: (state) => {
            return !state;
        }
    }
});

export const { toggle } = showSpeedsSlice.actions;
export default showSpeedsSlice.reducer;