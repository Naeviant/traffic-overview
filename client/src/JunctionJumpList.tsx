import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface JunctionJumpListProps {
    roadSections: any[];
    // eslint-disable-next-line no-unused-vars
    jumpFunction(index: number): void;
}

function JunctionJumpList(props: JunctionJumpListProps) {
    const { roadSections, jumpFunction } = props;

    return (
        <Accordion
            disableGutters
            sx={{
                maxHeight: 'calc(100% - 488px)',
                borderRadius: '0 !important',
                overflowY: 'auto',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#AAAAAA' }} />}
                sx={{
                    backgroundColor: '#111111',
                    color: '#AAAAAA',
                }}
            >
                <Typography>Jump to Junction</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    backgroundColor: '#111111',
                }}
            >
                {
                    [...roadSections].reverse().filter((e: any) => e.interface === 'JUNCTION').map((section: any, index: number) => (
                        <Button
                            key={index}
                            onClick={() => jumpFunction(index)}
                            fullWidth
                            sx={{
                                color: '#AAAAAA',
                                '&:hover': {
                                    backgroundColor: 'transparent !important',
                                },
                            }}
                        >
                            { section.payload.name }
                        </Button>
                    ))
                }
            </AccordionDetails>
        </Accordion>
    );
}

export default JunctionJumpList;
