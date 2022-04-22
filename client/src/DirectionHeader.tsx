import React from 'react';
import { useSelector } from 'react-redux';
import {
    Paper,
    Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface DirectionHeaderProps {
    primary: boolean;
    direction: string;
}

function DirectionHeader(props: DirectionHeaderProps) {
    const { primary, direction } = props;

    const colour = useSelector((state: any) => state.road.colour);

    return (
        <Paper sx={{
            backgroundColor: colour === 'blue' ? '#01579b' : '#1b5e20',
            color: '#FFFFFF',
            padding: 2,
            margin: 1,
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            {
                primary
                    ? (
                        <ArrowUpwardIcon sx={{
                            marginRight: '16px',
                            display: {
                                xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none',
                            },
                        }}
                        />
                    )
                    : (
                        <ArrowDownwardIcon sx={{
                            marginRight: '16px',
                            display: {
                                xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none',
                            },
                        }}
                        />
                    )
            }
            <Typography
                align="center"
                variant="h4"
                sx={{
                    display: {
                        xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none',
                    },
                }}
            >
                { direction }
            </Typography>
            <Typography
                align="center"
                variant="h4"
                sx={{
                    display: {
                        xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block',
                    },
                }}
            >
                {
                    {
                        NB: 'Northbound',
                        EB: 'Eastbound',
                        SB: 'Southbound',
                        WB: 'Westbound',
                        CW: 'Clockwise',
                        AC: 'Anticlockwise',
                    }[direction]
                }
            </Typography>
        </Paper>
    );
}

export default DirectionHeader;
