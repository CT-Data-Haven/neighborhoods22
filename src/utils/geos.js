import { bbox, feature, mesh, merge } from 'topojson-client';

export const getBounds = (geo) => {
    const b = bbox(geo);
    return [[b[1], b[0]], [b[3], b[2]]];
};
