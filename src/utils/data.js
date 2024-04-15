import _ from 'lodash';
import { format } from 'd3-format';
import { titleCase } from './strings';

// filter for indicators with type m
export const getMappable = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    const avail = mappable.map((indicator) => indicator.indicator);
    return avail;
};

export const prepProfile = (data, nhood, meta) => {
    const nhoodData = _.chain(data)
        .find({ location: nhood })
        .omit(['level', 'location'])
        .value();
    const profile = meta.map((indicator, i) => {
        const value = nhoodData[indicator.indicator];
        const fmt = format(indicator.format);
        return {
            id: i,
            indicator: indicator.display,
            value: fmt(value)
        };
    });
    return profile;
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
                valueFormatter: isNumeric ? format(m.format) : null,
                type: isNumeric ? 'number' : 'string',
                flex: 1,
                renderHeader: (params) => {
                    // console.log(params);
                    return (params.headerName)
                }
            };
            col.minWidth = m.indicator === 'location' ? 180 : 80;

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