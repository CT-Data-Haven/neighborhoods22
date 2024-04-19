import { useState, useEffect, useContext } from 'react';
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
    prepMap,
    prepNotes,
    getTableRows,
    getFormatter,
    abbreviate,
    findNhood,
    getBounds,
    makeGeoLayers,
    makeChoroScale,
    makeTooltip,
} from './utils';

// library components
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import BarChartIcon from '@mui/icons-material/BarChart';

// styling
import 'leaflet/dist/leaflet';
import './App.scss'

// data
import fullData from './data/nhood_wide_2022.json';
import fullNotes from './data/notes.json';
import meta from './data/indicators.json';

// bespoke components
import Row from './components/Layout/Row/Row';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Profile from './components/Profile/Profile';
import DataTable from './components/DataTable/DataTable';
import VizPanel from './components/VizPanel/VizPanel';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';

// const shapes = {
//     bridgeport: import('./data/shapes/bridgeport_topo.json'),
//     hartford: import('./data/shapes/hartford_topo.json'),
//     new_haven: import('./data/shapes/new_haven_topo.json'),
//     stamford: import('./data/shapes/stamford_topo.json'),
// };
import shapes from './data/shapes';

function App({ palette }) {
    const theme = useTheme();

    const cities = Object.keys(fullData);
    const topics = Object.keys(meta);
    const views = [
        { value: 'map', icon: <MapIcon fontSize='small' /> },
        { value: 'chart', icon: <BarChartIcon fontSize='small' /> }
    ];

    // state
    const defaultPage = { pageSize: 10, page: 0 };
    const [city, setCity] = useState(cities[0]);
    const [topic, setTopic] = useState(topics[0]);
    const [indicator, setIndicator] = useState(getMappable(meta[topic])[0]);
    const [view, setView] = useState(views[0].value);
    const [page, setPage] = useState(defaultPage);
    const [resolvedShape, setResolvedShape] = useState(null);

    const data = fullData[city][topic];
    let nhoods = getNhoods(data);

    const notes = prepNotes(fullNotes, city);

    const [nhood, setNhood] = useState(nhoods[0]);

    // menu options
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
    const mapData = prepMap(data, indicator);
    const nhoodIdx = findNhood(chartData, nhood);

    const barColors = {
        base: theme.palette.grey[500],
        hilite: theme.palette.primary.main,
    };
    
    return (
        <div className='App'>
            <Container fixed>
                
                <Header heading={`${cityLookup[city]} Neighborhood Profiles`} />

                <ControlPanel controlGrps={controlProps} />

                <Row xs={12} md={[7, 5]}>
                    <VizPanel
                        title={indicatorLookup[indicator]}
                        indicator={indicator}
                        chartData={chartData}
                        mapData={mapData}
                        city={city}
                        // geo={resolvedShape ? makeGeoLayers(resolvedShape) : null}
                        // bbox={resolvedShape ? getBounds(resolvedShape) : null}
                        layers={makeGeoLayers(shapes[city])}
                        bbox={getBounds(shapes[city])}
                        views={views}
                        view={view}
                        viewChangeHandler={handleView}
                        nhood={nhood}
                        nhoodChangeHandler={handleNhood}
                        formatter={getFormatter(meta[topic].indicators, indicator)}
                        abbreviate={abbreviate}
                        barColors={barColors}
                        colorscale={makeChoroScale(mapData, palette, 5)}
                        nhoodIdx={nhoodIdx}
                        makeTooltip={makeTooltip}
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

                <Footer 
                    city={city} 
                    cityName={cityLookup[city]} 
                    dwBase={'https://data.world/ctdatahaven/datahaven-profiles-2022'}
                    ghBase={'https://github.com/CT-Data-Haven/nhood_profile_data22/blob/main/to_distro'}
                    csvFn={`${city}_nhood_2022_acs_health_comb.csv`}
                    {...notes}
                />
            </Container>
        </div>
    );
}

export default App
