import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SwipeableDrawer } from '@mui/material';

import MenuContent from './MenuContent';

import { show as showSidebar, hide as hideSidebar } from './state/showSidebar';

interface MobileSidebarBarProps {
    dataTimestamp: number;
    refresh(): void;
}

function MobileSidebarBar(props: MobileSidebarBarProps) {
    const dispatch = useDispatch();

    const {
        refresh,
        dataTimestamp,
    } = props;

    const sidebarVisibility = useSelector((state: any) => state.showSidebar);

    return (
        <SwipeableDrawer
            anchor="left"
            open={sidebarVisibility}
            onOpen={() => dispatch(showSidebar())}
            onClose={() => dispatch(hideSidebar())}
            PaperProps={{ sx: { backgroundColor: '#222222', padding: '8px' } }}
        >
            <MenuContent
                refresh={refresh}
                dataTimestamp={dataTimestamp}
            />
        </SwipeableDrawer>
    );
}

export default MobileSidebarBar;
