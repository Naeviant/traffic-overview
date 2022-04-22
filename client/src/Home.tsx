import React from 'react';
import {
    Box,
    Typography
} from '@mui/material';

import RoadSelector from './RoadSelector';

function Home() {
    return (
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
                    <RoadSelector width="600px" />
                </Box>
            </Box>
        </Box>
    );
}

export default Home;