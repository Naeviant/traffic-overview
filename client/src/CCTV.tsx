import React from 'react';
import {
  Paper,
  Grid,
  Typography
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import PinDropIcon from '@mui/icons-material/PinDrop';
import VideocamIcon from '@mui/icons-material/Videocam';

interface CCTVProps {
    lat: number;
    long: number;
    image: string;
    description: string;
}

function CCTV(props: CCTVProps) {
    const { lat, long, image, description } = props;

    return (
        <Paper sx={{ 
            padding: 1,
            margin: 1
        }}>
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <VideocamIcon sx={{
                        paddingRight: 2,
                        position: 'relative',
                        top: '2px'
                    }} />
                </Grid>
                <Grid item>
                    <Typography variant='body1'>CCTV</Typography>
                    <Typography variant='caption'>{ description }</Typography>
                </Grid>
                <Grid item sx={{
                    marginLeft: 'auto',
                    marginRight: 0
                }}>
                    <a href={ image } target="_blank" rel="noreferrer">
                        <ImageIcon sx={{
                            position: 'relative',
                            top: '2px',
                            paddingRight: 1,
                            color: '#000000'
                        }} />
                    </a>
                    <a href={ `https://www.google.com/maps?q=${ lat }+${ long }` } target="_blank" rel="noreferrer">
                        <PinDropIcon sx={{
                            position: 'relative',
                            top: '2px',
                            paddingRight: 1,
                            color: '#000000'
                        }} />
                    </a>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CCTV;