import { createSlice } from '@reduxjs/toolkit';

export const showSidebarSlice = createSlice({
    name: 'showSidebar',
    initialState: false,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        show: (state) => true,
        // eslint-disable-next-line no-unused-vars
        hide: (state) => false,
    },
});

export const { show, hide } = showSidebarSlice.actions;
export default showSidebarSlice.reducer;
