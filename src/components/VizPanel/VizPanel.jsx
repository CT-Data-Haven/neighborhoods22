import React from "react";
import Panel from '../Layout/Panel/Panel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const VizPanel = ({ indicator, data, views, view, changeHandler }) => {
    return (
        <Panel title={indicator}>
            <TabContext value={view}>
                <TabList
                    onChange={changeHandler}
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
                    <div>map</div>
                </TabPanel>
                <TabPanel value='chart' sx={{ minHeight: 200 }}>
                    <div>chart</div>
                </TabPanel>
            </TabContext>
        </Panel>
    );
};

export default VizPanel;
