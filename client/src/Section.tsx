import React from 'react';
import { Grid } from '@mui/material';

import SectionData from './SectionData';

interface SectionProps {
    primaryDirectionSection: any;
    secondaryDirectionSection: any;
    showSpeeds: boolean;
    showDistances: boolean;
    showCCTV: boolean;
    showVMS: boolean;
    showIncidents: boolean;
    showRoadworks: boolean;
}

function Section(props: SectionProps) {
    const { 
        primaryDirectionSection,
        secondaryDirectionSection,
        showSpeeds,
        showDistances,
        showCCTV,
        showVMS,
        showIncidents,
        showRoadworks
    } = props;

    return (
        <>
            <Grid item xs={6} sm={5} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <SectionData 
                    data={primaryDirectionSection}
                    showSpeeds={showSpeeds}
                    showDistances={showDistances}
                    showCCTV={showCCTV}
                    showVMS={showVMS}
                    showIncidents={showIncidents}
                    showRoadworks={showRoadworks}
                />
            </Grid>
            <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}></Grid>
            <Grid item xs={6} sm={5} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <SectionData 
                    data={secondaryDirectionSection}
                    showSpeeds={showSpeeds}
                    showDistances={showDistances}
                    showCCTV={showCCTV}
                    showVMS={showVMS}
                    showIncidents={showIncidents}
                    showRoadworks={showRoadworks}
                />
            </Grid>
        </>
    );
}

export default Section;