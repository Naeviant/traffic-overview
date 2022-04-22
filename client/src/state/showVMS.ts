import { createSlice } from '@reduxjs/toolkit';

export const showVMSSlice = createSlice({
    name: 'showVMS',
    initialState: true,
    reducers: {
        toggle: (state) => !state,
    },
});

export const { toggle } = showVMSSlice.actions;
export default showVMSSlice.reducer;
