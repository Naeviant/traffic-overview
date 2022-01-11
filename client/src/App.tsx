import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Container,
  Grid
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

  useEffect(() => {
    if (roads.length === 0) {
      axios.get('/roads').then((resp: AxiosResponse) => {
        setRoads(resp.data.data);
      });
    } 
    if ((!data && road) || (data && road !== data.road)) {
      axios.get(`/road/${ road }`).then((resp: AxiosResponse) => {
        setData(resp.data.data);
      });
    }
  });
  
  return (
    <div className="App">
      <Container>
        <Box sx={{ bgcolor: "#EEEEEE" }}>
          <RoadSelector road={ road } roads={ roads } setRoad={ roadChange } />
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
                  data.primaryDirectionSections.map((section: any, index: number) => (
                    section.interface === "JUNCTION"
                    ?
                      <>
                        <Grid item xs={5}>
                          <JunctionHeader text={ section.payload.destination } />
                        </Grid>
                        <Grid item xs={2}>
                          <JunctionHeader text={ section.payload.name } />
                        </Grid>
                        <Grid item xs={5}>
                          <JunctionHeader text={ data.secondaryDirectionSections[index].payload.destination } />
                        </Grid>
                      </>
                    : 
                      <>
                        <Grid item xs={5}>
                          <AverageSpeed speed={ Math.round(section.payload.speed)} />
                          {
                            section.payload.data.map((info: any, index: number) => (
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
                        <Grid item xs={5}>
                          <AverageSpeed speed={ Math.round(data.secondaryDirectionSections[index].payload.speed)} />
                          {
                            data.secondaryDirectionSections[index].payload.data.map((info: any, index: number) => (
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
      </Container>
    </div>
  );
}

export default App;
