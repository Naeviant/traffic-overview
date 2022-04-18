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
            margin: 1,
            width: 'calc(100% - 32px);',
            backgroundColor: '#111111',
            color: '#AAAAAA'
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
                    <a href={ image } target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                        <Typography sx={{
                            color: '#AAAAAA',
                            display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }
                        }}>
                            CCTV
                        </Typography>
                    </a>
                    <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>CCTV</Typography>
                    <Typography variant='caption' sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>{ description }</Typography>
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
                            color: '#AAAAAA',
                            display: { xs: 'none', sm: 'inline-block', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' }
                        }} />
                    </a>
                    <a href={ `https://www.google.com/maps?q=${ lat }+${ long }` } target="_blank" rel="noreferrer">
                        <PinDropIcon sx={{
                            position: 'relative',
                            top: '2px',
                            paddingRight: 1,
                            color: '#AAAAAA',
                            display: { xs: 'none', sm: 'none', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' }
                        }} />
                    </a>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CCTV;