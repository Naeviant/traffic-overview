import { createSlice } from '@reduxjs/toolkit';

export const roadsSlice = createSlice({
    name: 'roads',
    initialState: [] as string[],
    reducers: {
        // eslint-disable-next-lint no-unused-vars
        set: (state, action) => action.payload,
    },
});

export const { set } = roadsSlice.actions;
export default roadsSlice.reducer;
