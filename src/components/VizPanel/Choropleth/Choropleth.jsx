import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { LayerGroup } from 'react-leaflet/LayerGroup';
import Legend from '../Legend/Legend';

// following Nathan's lead of using inner & outer components to avoid using state
// since react-leaflet doesn't update geography on prop change
const baseStyles = {
    weight: 0.5,
    fillOpacity: 0.75,
};

const getStyle = (feature, data, colorscale) => {
    const name = feature.properties.name;
    const fillColor = data[name] ? colorscale(data[name]) : '#ccc';

    return {
        fillColor,
        color: '#555',
        opacity: 1,
        ...baseStyles,
    };
};

const cityStyle = {
    fillColor: 'transparent',
    color: '#333',
    pointerEvents: 'none',
    weight: 1.5,
    fillOpacity: 0,
};

const featureHilite = ({ sourceTarget }) => {
    sourceTarget.setStyle({
        fillOpacity: 0.95,
        weight: 1,
    });
};

const featureUnhilite = ({ target }) => {
    target.setStyle(baseStyles);
};



const ChoroInner = ({ layers, city, data, colorscale, makeTooltip, clickHandler, formatter, indicator }) => {
    
    const handleFeature = (feature, layer) => {
        layer.bindTooltip(() => {
            const text = makeTooltip(data, feature.properties.name, formatter);
            return text;
        }, {
            direction: 'top',
            offset: [0, -20],
            className: `custom-tip MuiPaper-elevation2`,
        });
    };

    return (
        <>
            <TileLayer
                key={`tile-${city}`}
                opacity={0.4}
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png"
            />
            <LayerGroup key={`layers-${city}-${indicator}`}>
                <GeoJSON
                    key={`nhood-layer-${city}-${indicator}`}
                    data={layers.nhoods}
                    style={(feature) => getStyle(feature, data, colorscale)}
                    onEachFeature={handleFeature}
                    eventHandlers={{
                        click: (e) => clickHandler(e.sourceTarget.feature.properties.name),
                        mouseover: (e) => featureHilite(e),
                        mouseout: (e) => featureUnhilite(e),
                    }}
                />

                <GeoJSON
                    key={'mesh-layer-${city}'}
                    data={layers.meshed}
                    style={cityStyle}
                    interactive={false}
                />

                <GeoJSON
                    key={`merge-layer-${city}`}
                    data={layers.merged}
                    style={cityStyle}
                    interactive={false}
                />
            </LayerGroup>
        </>
    );
};

const Choropleth = ({
    data, 
    layers, 
    bbox, 
    city, 
    colorscale, 
    makeTooltip, 
    clickHandler,
    formatter,
    indicator,
}) => {
    // need everything to have city-indicator keys to force rerender
    return (
        <Box minHeight={500}>
            {layers ? (
                <MapContainer
                    id={`map-div-${city}-${indicator}`}
                    key={`map-key-${city}-${indicator}`}
                    bounds={bbox}
                    scrollWheelZoom={false}
                    style={{ height: '500px', }}
                    minZoom={10}
                    maxZoom={13}
                >
                    <ChoroInner
                        layers={layers}
                        city={city}
                        bbox={bbox}
                        data={data}
                        colorscale={colorscale}
                        makeTooltip={makeTooltip}
                        clickHandler={clickHandler}
                        formatter={formatter}
                        indicator={indicator}
                    />
                    <Legend colorscale={colorscale} formatter={formatter} />
                </MapContainer>
            ) : <div></div>}
        </Box>
    );
};

export default Choropleth;
