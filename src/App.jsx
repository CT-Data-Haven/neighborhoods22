import { useState } from 'react';
// helper functions
import {
    prepCities,
    prepIndicators,
    prepTopics,
    getMappable,
    getNhoods,
    prepNhoods,
    prepProfile,
    prepTable,
    prepChart,
    getTableRows,
    getFormatter,
    abbreviate,
    makeBarFill,
    findNhood,
    
} from './utils';

// library components
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

// styling
import './App.scss'

// data
import fullData from './data/nhood_wide_2022.json';
import notes from './data/notes.json';
import meta from './data/indicators.json';

// bespoke components
import Row from './components/Layout/Row/Row';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Profile from './components/Profile/Profile';
import DataTable from './components/DataTable/DataTable';
import VizPanel from './components/VizPanel/VizPanel';

function App({ palette }) {
    const theme = useTheme();

    const cities = Object.keys(fullData);
    const topics = Object.keys(meta);
    const views = ['map', 'chart'];

    // state
    const defaultPage = { pageSize: 10, page: 0 };
    const [city, setCity] = useState(cities[0]);
    const [topic, setTopic] = useState(topics[0]);
    const [indicator, setIndicator] = useState(getMappable(meta[topic])[0]);
    const [view, setView] = useState(views[1]);
    const [page, setPage] = useState(defaultPage);

    const data = fullData[city][topic];
    let nhoods = getNhoods(data);

    const [nhood, setNhood] = useState(nhoods[0]); // fill in later


    const [cityOptions, cityLookup] = prepCities(cities);
    const [topicOptions, topicLookup] = prepTopics(meta);
    const nhoodOptions = prepNhoods(nhoods);

    let [indicatorOptions, indicatorLookup] = prepIndicators(meta[topic]);
    let indicators = getMappable(meta[topic]);


    // event handling
    const handleCity = (value) => {
        setCity(value);
        nhoods = getNhoods(fullData[value][topic]);
        setNhood(nhoods[0]);
        setPage(defaultPage);
    };

    // depends on city
    const handleNhood = (value) => {
        setNhood(value);
    };

    const handleTopic = (value) => {
        setTopic(value);
        indicators = getMappable(meta[value]);
        setIndicator(indicators[0]);
        setPage(defaultPage);
    };

    // depends on topic
    const handleIndicator = (value) => {
        setIndicator(value);
    };

    const handleView = (e, newValue) => {
        setView(newValue);
    };

    const controlProps = {
        location: [
            { key: 'city', items: cityOptions, label: 'Select a city', selected: city, changeHandler: handleCity },
            { key: 'nhood', items: nhoodOptions, label: 'Select a neighborhood / location to highlight', selected: nhood, changeHandler: handleNhood }
        ],
        topic: [
            { key: 'topic', items: topicOptions, label: 'Select a topic', selected: topic, changeHandler: handleTopic },
            { key: 'indicator', items: indicatorOptions, label: 'Select an indicator', selected: indicator, changeHandler: handleIndicator }
        ]
    };

    const chartData = prepChart(data, indicator);
    const nhoodIdx = findNhood(chartData, nhood);

    const barColors = { 
        base: theme.palette.grey[500],
        hilite: theme.palette.primary.main,
    };

    return (
        <div className='App'>
            <Stack direction={'column'}>
                <h1>{cityLookup[city]} Neighborhood Profiles</h1>

                <ControlPanel controlGrps={controlProps} />

                <Row xs={12} md={[7, 5]}>
                    <VizPanel
                        title={indicatorLookup[indicator]}
                        indicator={indicator}
                        data={chartData}
                        views={views}
                        view={view}
                        viewChangeHandler={handleView}
                        nhood={nhood}
                        nhoodChangeHandler={handleNhood}
                        formatter={getFormatter(meta[topic].indicators, indicator)}
                        abbreviate={abbreviate}
                        barColors={barColors}
                        nhoodIdx={nhoodIdx}
                    />
                    <Profile
                        topic={topicLookup[topic]}
                        nhood={nhood}
                        data={prepProfile(data, nhood, meta[topic].indicators)}
                    />
                </Row>
                <DataTable
                    topic={topicLookup[topic]}
                    nhood={nhood}
                    data={prepTable(data, meta[topic].indicators)}
                    pages={getTableRows(data)}
                    paginationModel={page}
                    pageChangeHandler={setPage}
                    nhoodChangeHandler={handleNhood}
                />
            </Stack>
        </div>
    );
}

export default App
