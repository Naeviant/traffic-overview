import React, { useState, useEffect, useRef } from 'react';
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

function App() {
  const [road, setRoad] = useState<(string)>("");
  const [roads, setRoads] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [colour, setColour] = useState<string>('blue');
  const [showSpeeds, setShowSpeeds] = useState<boolean>(true);
  const [showDistances, setShowDistances] = useState<boolean>(true);
  const [showCCTV, setShowCCTV] = useState<boolean>(true);
  const [showVMS, setShowVMS] = useState<boolean>(true);
  const [showIncidents, setShowIncidents] = useState<boolean>(true);
  const [showRoadworks, setShowRoadworks] = useState<boolean>(true);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const refs = useRef<any>([]);

  const roadChange = (newRoad: string) => {
    setRoad(newRoad);
    if (newRoad.slice(0, 1) === 'M' || newRoad.slice(newRoad.length - 3) === '(M)') {
      setColour('blue');
    } else {
      setColour('green');
    }
  };

  const unsetRoad = () => {
    setRoad("");
  }

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
        setRoads(resp.data.data);
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
  }, [roads.length, data, road]);
  
  return (
    <div className="App">
      {
        road
        ? <>
            <MobileSidebarBar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              road={road}
              roads={roads}
              setRoad={roadChange}
              unsetRoad={unsetRoad}
              refresh={refresh}
              dataTimestamp={data && data.timestamp ? data.dataTimestamp : 0}
              currentSpeedsState={showSpeeds}
              currentDistancesState={showDistances}
              currentCCTVState={showCCTV}
              currentVMSState={showVMS}
              currentIncidentsState={showIncidents}
              currentRoadworksState={showRoadworks}
              toggleSpeeds={setShowSpeeds}
              toggleDistances={setShowDistances}
              toggleCCTV={setShowCCTV}
              toggleVMS={setShowVMS}
              toggleIncidents={setShowIncidents}
              toggleRoadworks={setShowRoadworks}
            />
            <Box sx={{
              backgroundColor: "#222222"
            }}>
              <MobileTopBar
                road={road}
                roads={roads}
                setRoad={roadChange}
                setShowSidebar={setShowSidebar}
              />
              {
                loading
                ? <Loading />
                : data !== null && data.dataTimestamp
                  ?
                    <Grid container>
                      <Grid item p={2} lg={2} xl={2} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }, position: 'fixed', top: 0, bottom: 0 }}>
                        <MenuContent
                          road={road}
                          roads={roads}
                          setRoad={roadChange}
                          unsetRoad={unsetRoad}
                          refresh={refresh}
                          dataTimestamp={data && data.timestamp ? data.dataTimestamp : 0}
                          toggleSidebar={setShowSidebar}
                          currentSpeedsState={showSpeeds}
                          currentDistancesState={showDistances}
                          currentCCTVState={showCCTV}
                          currentVMSState={showVMS}
                          currentIncidentsState={showIncidents}
                          currentRoadworksState={showRoadworks}
                          toggleSpeeds={setShowSpeeds}
                          toggleDistances={setShowDistances}
                          toggleCCTV={setShowCCTV}
                          toggleVMS={setShowVMS}
                          toggleIncidents={setShowIncidents}
                          toggleRoadworks={setShowRoadworks}
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
                          colour={colour}
                          roadName={data.road}
                          circularRoad={data.circularRoad}
                          primaryDirection={data.primaryDirection}
                          secondaryDirection={data.secondaryDirection}
                          refs={refs}
                          showSpeeds={showSpeeds}
                          showDistances={showDistances}
                          showCCTV={showCCTV}
                          showVMS={showVMS}
                          showIncidents={showIncidents}
                          showRoadworks={showRoadworks}
                        />
                      </Grid>
                    </Grid>
                  : 
                    <NotFound unsetRoad={unsetRoad} />
              }
            </Box>
          </>
        :
          <Home 
            road={road}
            roads={roads}
            setRoad={roadChange}
          />
      }
    </div>
  );
}

export default App;
