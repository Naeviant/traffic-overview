import { createSlice } from '@reduxjs/toolkit';

export const roadsSlice = createSlice({
    name: 'roads',
    initialState: [] as string[],
    reducers: {
        set: (state, action) => {
            return action.payload;
        }
    }
});

export const { set } = roadsSlice.actions;
export default roadsSlice.reducer;