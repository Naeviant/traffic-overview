import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Button,
  Grid, Typography
} from '@mui/material';

import DirectionHeader from './DirectionHeader';
import RoadHeader from './RoadHeader';
import JunctionHeader from './JunctionHeader';
import AverageSpeed from './AverageSpeed';
import CCTV from './CCTV';
import Event from './Event';
import VMS from './VMS';
import RoadSelector from './RoadSelector';

function App() {
  const [road, setRoad] = useState<(string)>("");
  const [roads, setRoads] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);

  const roadChange = (e: any) => {
    setRoad(e.target.value);
  };

  const unsetRoad = (e: any) => {
    setRoad("");
  }

  useEffect(() => {
    if (roads.length === 0) {
      axios.get(`${process.env.REACT_APP_API_BASE}roads`).then((resp: AxiosResponse) => {
        setRoads(resp.data.data);
      });
    } 
    if ((!data && road) || (data && road !== data.road)) {
      axios.get(`${process.env.REACT_APP_API_BASE}road/${ road }`).then((resp: AxiosResponse) => {
        setData(resp.data.data);
      });
    }
  });
  
  return (
    <div className="App">
      {
        !road
        ?
          <Box sx={{ 
            backgroundImage: "url('/images/landing-bg.jpg')",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <Box sx={{ 
              backgroundColor: "#000000",
              opacity: 0.9,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}></Box>
            <Box sx={{ zIndex: 1 }}>
              <Typography variant="h1" align="center" color="#AAAAAA">Traffic Overview</Typography>
              <Typography variant="h5" align="center" color="#AAAAAA">All the information you need on England's motorways.</Typography>
              <Box sx={{
                marginTop: 8,
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}>
                <RoadSelector width="600px" road={ road } roads={ roads } setRoad={ roadChange } />
              </Box>
            </Box>
          </Box>
        :
          <Box sx={{
            backgroundColor: "#222222"
          }}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: '16px',
              paddingBottom: '16px',
            }}>
              <Button variant="contained" onClick={ unsetRoad } sx={{ marginRight: '16px' }}>Home</Button>
              <RoadSelector width="calc(100% - 112px)" road={ road } roads={ roads } setRoad={ roadChange } />
            </Box>
            {
              data 
              ?
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <DirectionHeader direction={ data.primaryDirection } />
                  </Grid>
                  <Grid item xs={2}>
                    <RoadHeader road={ data.road } ringRoad={ data.circularRoad } />
                  </Grid>
                  <Grid item xs={5}>
                    <DirectionHeader direction={ data.secondaryDirection } />
                  </Grid>
                  {
                    [...data.primaryDirectionSections].reverse().map((section: any, index: number) => (
                      section.interface === "JUNCTION"
                      ?
                        <>
                          <Grid item xs={5}>
                            <JunctionHeader text={ section.payload.destination } />
                          </Grid>
                          <Grid item xs={2}>
                            <JunctionHeader text={ section.payload.name } arrows />
                          </Grid>
                          <Grid item xs={5}>
                            <JunctionHeader text={ data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.destination } />
                          </Grid>
                        </>
                      : 
                        <>
                          <Grid item xs={5} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                          }}>
                            <AverageSpeed speed={ Math.round(section.payload.speed)} />
                            {
                              [...section.payload.data].reverse().map((info: any, index: number) => (
                                info.interface === "CCTV"
                                ? 
                                  <CCTV lat={ info.payload.lat } long={ info.payload.long } image={ info.payload.image } description={ info.payload.description } />
                                : info.interface === "VMS"
                                  ?
                                    <VMS lat={ info.payload.lat } long={ info.payload.long } vms={ info.payload.vms } sig={ info.payload.sig } />
                                  : info.interface === "EVENT"
                                    ?
                                        <Event type={ info.payload.type } reason={ info.payload.reason } severity={ info.payload.severity } lanes={ info.payload.lanes } />
                                    : <></>
                              ))
                            }
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={5} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                          }}>
                            <AverageSpeed speed={ Math.round(data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.speed)} />
                            {
                              [...data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.data].reverse().map((info: any, index: number) => (
                                info.interface === "CCTV"
                                ?
                                  <CCTV lat={ info.payload.lat } long={ info.payload.long } image={ info.payload.image } description={ info.payload.description } />
                                : info.interface === "VMS"
                                  ?
                                    <VMS lat={ info.payload.lat } long={ info.payload.long } vms={ info.payload.vms } sig={ info.payload.sig } />
                                  : info.interface === "EVENT"
                                    ?
                                      <Event type={ info.payload.type } reason={ info.payload.reason } severity={ info.payload.severity } lanes={ info.payload.lanes } />
                                    : <></>
                              ))
                            }
                          </Grid>
                        </>
                    ))
                  }
                </Grid>
              : <></>
            }
          </Box>

      }
    </div>
  );
}

export default App;
