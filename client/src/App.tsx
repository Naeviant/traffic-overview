import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Grid,
} from '@mui/material';

import Home from './Home';
import NotFound from './NotFound';
import Loading from './Loading';
import MenuContent from './MenuContent';
import JunctionJumpList from './JunctionJumpList';
import MobileTopBar from './MobileTopBar';
import MobileSidebarBar from './MobileSideBar';
import RoadData from './RoadData';

import { set as setRoads } from './state/roads';

function App() {
  const dispatch = useDispatch();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const road = useSelector((state: any) => state.road.name);
  const roads = useSelector((state: any) => state.roads);

  const refs = useRef<any>([]);

  const refresh = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_BASE}road/${ road }`, { validateStatus: (status: number) => { return (status >= 200 && status < 300) || status === 404 }}).then((resp: AxiosResponse) => {
      refs.current = [];
      setData(resp.data.data);
      setLoading(false);
    });
  }

  const jump = (index: number) => {
    refs.current.filter((x: any) => x)[index].scrollIntoView();
  }

  useEffect(() => {
    if (roads.length === 0) {
      axios.get(`${process.env.REACT_APP_API_BASE}roads`).then((resp: AxiosResponse) => {
        dispatch(setRoads(resp.data.data));
      });
    } 
    if ((!data && road) || (data && road && road !== data.road)) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_BASE}road/${ road }`, { validateStatus: (status: number) => { return (status >= 200 && status < 300) || status === 404 }}).then((resp: AxiosResponse) => {
        refs.current = [];
        if (resp.status === 404) {
          setData({ road });
        } else {
          setData(resp.data.data);
        }
        setLoading(false);
      });
    }
  }, [roads.length, data, road, dispatch]);
  
  return (
    <div className="App">
      {
        road
        ? <>
            <MobileSidebarBar
              refresh={refresh}
              dataTimestamp={data && data.timestamp ? data.dataTimestamp : 0}
            />
            <Box sx={{
              backgroundColor: "#222222"
            }}>
              <MobileTopBar />
              {
                loading
                ? <Loading />
                : data !== null && data.dataTimestamp
                  ?
                    <Grid container>
                      <Grid item p={2} lg={2} xl={2} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }, position: 'fixed', top: 0, bottom: 0 }}>
                        <MenuContent
                          refresh={refresh}
                          dataTimestamp={data && data.timestamp ? data.dataTimestamp : 0}
                        />
                        <JunctionJumpList
                          roadSections={data.primaryDirectionSections}
                          jumpFunction={jump}
                        />
                      </Grid>
                      <Grid item xs={0} sm={0} md={0} lg={2} xl={2}>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                        <RoadData 
                          primaryDirectionSections={data.primaryDirectionSections}
                          secondaryDirectionSections={data.secondaryDirectionSections}
                          roadName={data.road}
                          circularRoad={data.circularRoad}
                          primaryDirection={data.primaryDirection}
                          secondaryDirection={data.secondaryDirection}
                          refs={refs}
                        />
                      </Grid>
                    </Grid>
                  : 
                    <NotFound />
              }
            </Box>
          </>
        :
          <Home />
      }
    </div>
  );
}

export default App;
