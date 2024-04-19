import _ from 'lodash';
import { bbox, feature, mesh, merge } from 'topojson-client';
import { scaleLinear, scaleQuantile } from 'd3-scale';

export const getBounds = (geo) => {
    const b = bbox(geo);
    return [[b[1], b[0]], [b[3], b[2]]];
};

export const makeGeoLayers = (shp) => {
    const cityName = Object.keys(shp.objects)[0];
    const nhoods = feature(shp, shp.objects[cityName]);
    const meshed = mesh(shp, shp.objects[cityName], (a, b) => a.town !== b.town);
    const merged = merge(shp, shp.objects[cityName].geometries);
    return { nhoods, meshed, merged };
};

export const makeChoroScale = (data, palette, nBrks) => {
    const vals = _.values(data);
    return scaleQuantile()
        .domain([_.min(vals), _.max(vals)])
        .range(palette)
        .unknown('#ddd');
};

export const makeTooltip = (data, name, formatter) => {
    return `${name}: <strong>${formatter(data[name])}</strong>`;
};