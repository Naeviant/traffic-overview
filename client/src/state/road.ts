import { createSlice } from '@reduxjs/toolkit';

export const roadSlice = createSlice({
    name: 'road',
    initialState: {
        name: '',
        colour: 'blue'
    },
    reducers: {
        set: (state, action) => {
            const newRoad = action.payload;

            if (newRoad.slice(0, 1) === 'M' || newRoad.slice(newRoad.length - 3) === '(M)') {
                return {
                    ...state,
                    name: newRoad,
                    colour: 'blue'
                }
            } else {
                return {
                    ...state,
                    name: newRoad,
                    colour: 'green'
                }
            }
        },
        unset: (state) => {
            return {
                name: '',
                colour: 'blue'
            };
        }
    }
});

export const { set, unset } = roadSlice.actions;
export default roadSlice.reducer;