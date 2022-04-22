import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Button,
    Grid,
} from '@mui/material';

import DataCheckboxCollection from './DataCheckboxCollection';
import DataFetchedTimestamp from './DataFetchedTimestamp';
import RoadSelector from './RoadSelector';

import { unset as unsetRoad } from './state/road';
import { hide as hideSidebar } from './state/showSidebar';

interface MenuContentProps {
    dataTimestamp: number;
    refresh(): void;
}

function MenuContent(props: MenuContentProps) {
    const dispatch = useDispatch();

    const {
        refresh,
        dataTimestamp,
    } = props;

    const colour = useSelector((state: any) => state.road.colour);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => { dispatch(unsetRoad()); hideSidebar(); }}
                        sx={{
                            backgroundColor: colour === 'blue' ? '#01579b' : '#1b5e20',
                            paddingTop: '16px',
                            paddingBottom: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        Home
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => { refresh(); hideSidebar(); }}
                        sx={{
                            backgroundColor: colour === 'blue' ? '#01579b' : '#1b5e20',
                            paddingTop: '16px',
                            paddingBottom: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        Refresh
                    </Button>
                </Grid>
            </Grid>
            <RoadSelector width="100%" />
            <br />
            <DataFetchedTimestamp timestamp={dataTimestamp} />
            <DataCheckboxCollection />
        </>
    );
}

export default MenuContent;
