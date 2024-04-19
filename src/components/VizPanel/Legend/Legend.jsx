import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { LegendLinear, LegendThreshold } from '@visx/legend';

const Legend = ({ colorscale, formatter }) => {
    return (
        <Paper
            variant='outlined'
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1000,
                m: 1,
                p: 1/2,
            }}>
            <LegendThreshold
                scale={colorscale}
                labelFormat={formatter}
            />
        </Paper>
    )
};

export default Legend;
