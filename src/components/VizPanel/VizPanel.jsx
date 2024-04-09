import React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Panel from '../Layout/Panel/Panel';
import Chart from './Chart/Chart';
import Map from './Map/Map';

const VizPanel = ({
    title,
    indicator,
    data,
    views, 
    view, 
    viewChangeHandler, 
    nhoodChangeHandler,
    formatter, 
    abbreviate, 
    barColors,
    nhood,
    nhoodIdx,
}) => {
    return (
        <Panel title={title}>
            <TabContext value={view}>
                <TabList
                    onChange={viewChangeHandler}
                    aria-label='Tabs to change visualization type'
                    selectionFollowsFocus
                >
                    {views.map((v) => (
                        <Tab
                            key={`view-tab-${v}`}
                            label={v}
                            value={v}
                        />
                    ))}
                </TabList>
                <TabPanel value='map' sx={{ minHeight: 200 }}>
                    <Map data={data} indicator={indicator} formatter={formatter} />
                </TabPanel>
                <TabPanel value='chart' sx={{ minHeight: 200 }}>
                    <Chart
                        data={data}
                        indicator={indicator}
                        formatter={formatter}
                        abbreviate={abbreviate}
                        colors={barColors}
                        clickHandler={nhoodChangeHandler}
                        nhoodIdx={nhoodIdx}
                    />
                </TabPanel>
            </TabContext>
        </Panel>
    );
};

export default VizPanel;
