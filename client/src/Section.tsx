import React from 'react';

import { Grid } from '@mui/material';

import SectionData from './SectionData';

interface SectionProps {
    primaryDirectionSection: any;
    secondaryDirectionSection: any;
}

function Section(props: SectionProps) {
    const {
        primaryDirectionSection,
        secondaryDirectionSection,
    } = props;

    return (
        <>
            <Grid
                item
                xs={6}
                sm={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <SectionData
                    data={primaryDirectionSection}
                />
            </Grid>
            <Grid
                item
                sm={2}
                sx={{
                    display: {
                        xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',
                    },
                }}
            />
            <Grid
                item
                xs={6}
                sm={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <SectionData
                    data={secondaryDirectionSection}
                />
            </Grid>
        </>
    );
}

export default Section;
