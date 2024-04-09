import React from 'react';
import { BarPlot, BarChart } from '@mui/x-charts/BarChart';
import Tooltip from '../Tooltip/Tooltip';

// coloring happens across series array but that's a weird way to shape this data
// instead get the index of nhood within the series, then use css to color
const Chart = ({ data, indicator, formatter, abbreviate, colors, clickHandler, nhoodIdx }) => {
    const onClick = (e, bar) => {
        console.log(bar);
        clickHandler(bar.axisValue);
    };
    const hiliteKey = `& .MuiBarElement-root:nth-of-type(${nhoodIdx})`;
    
    return (
        <BarChart
            dataset={data}
            series={[{
                dataKey: indicator,
                valueFormatter: formatter,
            }]}
            xAxis={[{
                id: 'value',
                valueFormatter: formatter,
                tickNumber: 5,
            }]}
            yAxis={[{
                id: 'location',
                dataKey: 'location',
                scaleType: 'band',
                valueFormatter: abbreviate(20),
            }]}
            leftAxis={{
                axisId: 'location',
                tickFontSize: 13,
                tickLabelStyle: { fontFamily: 'Barlow Semi Condensed' },
                disableTicks: true,
            }}
            layout="horizontal"
            sx={{ 
                width: '100%', 
                '& .MuiBarElement-root:hover': {
                    stroke: 'black',
                    strokeWidth: 1,
                },
                '& .MuiBarElement-root': {
                    fill: colors.base,
                    transitionDuration: '0.1s',
                },
                [hiliteKey]: {
                    // fill: 'primary.main',
                    fill: colors.hilite
                },
                
            }}
            height={480}
            margin={{ top: 10, right: 20, bottom: 30, left: 120 }}
            grid={{ vertical: true }}
            tooltip={{ trigger: 'axis' }}
            onAxisClick={onClick}
            slots={{
                axisContent: Tooltip,
            }}
            slotProps={{
                
            }}
        />
    );
};

export default Chart;
