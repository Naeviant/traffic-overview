import { createSlice } from '@reduxjs/toolkit';

export const roadSlice = createSlice({
    name: 'road',
    initialState: {
        name: '',
        colour: 'blue',
    },
    reducers: {
        set: (state, action) => {
            const newRoad = action.payload;

            if (newRoad.slice(0, 1) === 'M' || newRoad.slice(newRoad.length - 3) === '(M)') {
                return {
                    ...state,
                    name: newRoad,
                    colour: 'blue',
                };
            }
            return {
                ...state,
                name: newRoad,
                colour: 'green',
            };
        },
        // eslint-disable-next-line no-unused-vars
        unset: (state) => ({
            name: '',
            colour: 'blue',
        }),
    },
});

export const { set, unset } = roadSlice.actions;
export default roadSlice.reducer;
