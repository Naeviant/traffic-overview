import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface JunctionHeaderProps {
    text: string;
    arrows?: boolean;
}

function JunctionHeader(props: JunctionHeaderProps) {
    const { text, arrows } = props;

    return (
        <Paper sx={{ 
            backgroundColor: '#01579b', 
            color: '#FFFFFF',
            padding: 1,
            margin: 1
        }}>

            <Typography align="center" variant="h6">
                {
                    arrows
                        ?
                            <>
                                <ArrowDownwardIcon sx={{
                                    position: 'relative',
                                    top: '4px',
                                    right: '24px',
                                }} />
                                { text }
                                <ArrowUpwardIcon sx={{
                                    position: 'relative',
                                    top: '4px',
                                    left: '24px',
                                }} />
                            </>
                        : text
                }
            </Typography>
        </Paper>
    );
}

export default JunctionHeader;