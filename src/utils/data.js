import _ from 'lodash';
import { titleCase, makeFormatter, } from './strings';

// filter for indicators with type m
export const getMappable = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    return mappable.map((indicator) => indicator.indicator);
};

export const prepProfile = (data, nhood, meta) => {
    const nhoodData = _.chain(data)
        .find({ location: nhood })
        .omit(['level', 'location'])
        .value();
    return meta.map((indicator, i) => {
        const value = nhoodData[indicator.indicator];
        const fmt = makeFormatter(indicator.format);
        const valType = indicator.format === ',' ? 'count' : 'percent';
        return {
            id: i,
            indicator: indicator.display,
            value: fmt(value),
            type: valType,
        };
    });
};

export const prepTable = (data, meta) => {
    const columns = _.chain(data[0])
        .keys()
        .without('level')
        .map((key) => {
            const m = _.find(meta, { indicator: key }) || { indicator: key, display: titleCase(key) };
            // isNumeric is true if m.format is defined
            const isNumeric = m.format ? true : false;

            let col = {
                field: m.indicator,
                headerName: m.display,
                valueFormatter: isNumeric ? makeFormatter(m.format) : null,
                type: isNumeric ? 'number' : 'string',
                flex: 1,
                renderHeader: (params) => {
                    return (params.headerName)
                },
            };
            col.minWidth = m.indicator === 'location' ? 180 : 100;

            return col;
        })
        .value();
    const rows = _.chain(data)
        .map((d) => _.omit(d, 'level'))
        .map((d) => ({ id: d.location, ...d }))
        .value();
    return { columns, rows };
};

// order by indicator column descending
export const prepChart = (data, indicator) => {
    return _.sortBy(data, [indicator]).reverse();
};

export const prepMap = (data, indicator) => {
    return _.chain(data)
        .filter((d) => _.endsWith(d.level, 'neighborhood'))
        .keyBy('location')
        .mapValues(indicator)
        .value();
};

export const prepNotes = (notes, city) => {
    const dwSlug = notes.dwurls[city];
    const geography = notes.geography[city];
    const sources = notes.sources;
    return { dwSlug, geography, sources };
};

// split into series for chart
export const splitSeries = (data, nhood) => {
    return _.partition(data, (d) => d.location === nhood);
};

export const getTableRows = (rows) => {
    const n = rows.length;
    let pages = [10];
    if (n > 25) {
        pages.push(25);
    }
    pages.push({ value: n, label: 'All' });
    return pages;
};