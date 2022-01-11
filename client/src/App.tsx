import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Container, 
  FormControl, 
  FormLabel, 
  Grid,
  MenuItem,
  Select, Typography
} from '@mui/material';

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
    if ((!data && road) || (road !== data.road)) {
      axios.get(`/road/${ road }`).then((resp: AxiosResponse) => {
        setData(resp.data.data);
      });
    }
  });

  return (
    <div className="App">
      <Container>
        <Box sx={{ bgcolor: "#CCCCCC" }}>
          <FormControl>
            <FormLabel id="road-input-label">Road</FormLabel>
            <Select
              labelId="road-input-label"
              id="road-input"
              value={ road }
              label="Road"
              onChange={ roadChange }
            >
              {
                roads.map((road) => (
                  <MenuItem key={ road } value={ road }>{ road }</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          {
            data 
            ?
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Typography align="center" variant="h4" color="initial">{ data.primaryDirection }</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="h3" color="initial">{ data.road }</Typography>
                  {
                    data.circularRoad
                    ? <Typography align="center" variant="body2" color="initial">Ring Road</Typography>
                    : <></>
                  }
                </Grid>
                <Grid item xs={5}>
                  <Typography align="center" variant="h4" color="initial">{ data.secondaryDirection }</Typography>
                </Grid>
                {
                  data.primaryDirectionSections.map((section: any, index: number) => (
                    section.interface === "JUNCTION"
                    ?
                      <>
                        <Grid item xs={5}>
                          <Typography align="center" variant="h6" color="initial">{ section.payload.destination }</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography align="center" variant="h5" color="initial">{ section.payload.name }</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography align="center" variant="h6" color="initial">{ data.secondaryDirectionSections[index].payload.destination }</Typography>
                        </Grid>
                      </>
                    : 
                      <>
                        <Grid item xs={5}>
                          <Typography align="center" variant="body2" color="initial">Average Speed: { Math.round(section.payload.speed) }mph</Typography>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                          <Typography align="center" variant="body2" color="initial">Average Speed: { Math.round(data.secondaryDirectionSections[index].payload.speed) }mph</Typography>
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
