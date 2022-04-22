import { createSlice } from '@reduxjs/toolkit';

export const showSidebarSlice = createSlice({
    name: 'showSidebar',
    initialState: false,
    reducers: {
        show: (state) => {
            return true;
        },
        hide: (state) => {
            return false;
        }
    }
});

export const { show, hide } = showSidebarSlice.actions;
export default showSidebarSlice.reducer;