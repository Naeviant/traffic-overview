import React from 'react';
import {
    Paper,
    Grid,
    Typography,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface EventProps {
    type: string;
    reason: string;
    severity: string;
    lanes: { laneName: string, laneStatus: string }[];
}

function Event(props: EventProps) {
    const {
        type, reason, severity, lanes,
    } = props;

    return (
        <Paper sx={{
            padding: 1,
            margin: 1,
            backgroundColor: '#111111',
            color: '#AAAAAA',
        }}
        >
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <WarningIcon sx={{
                        paddingRight: 2,
                        position: 'relative',
                        top: '2px',
                    }}
                    />
                </Grid>
                <Grid item sx={{ width: { xs: 'calc(100% - 40px);' } }}>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{ type.toLowerCase() }</Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            display: {
                                xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',
                            },
                        }}
                    >
                        { reason }
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 0,
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            textTransform: 'capitalize',
                            display: {
                                xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block',
                            },
                        }}
                    >
                        { severity.toLowerCase() }
                        {' '}
                        Severity
                    </Typography>
                </Grid>
            </Grid>
            {
                lanes.length > 0
                    ? (
                        <Grid
                            container
                            sx={{
                                display: {
                                    xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',
                                },
                            }}
                        >
                            <br />
                            <table style={{ width: '100%', textAlign: 'center' }}>
                                <tbody>
                                    <tr>
                                        {
                                            lanes.map((lane, index) => (
                                                <td key={index}>{ lane.laneName }</td>
                                            ))
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            lanes.map((lane, index) => (
                                                <td key={index} style={{ textTransform: 'capitalize' }}>{ lane.laneStatus === 'HARD_SHOULDER_RUNNING' ? 'Running' : lane.laneStatus.toLowerCase() }</td>
                                            ))
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    )
                    : null
            }
        </Paper>
    );
}

export default Event;
