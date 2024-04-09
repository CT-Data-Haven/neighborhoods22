import _ from 'lodash';
import { format } from 'd3-format';
import { scaleOrdinal } from 'd3-scale';

const titleCase = (text) => {
    const words = _.words(text);
    const titleWords = words.map((word) => _.upperFirst(word));
    return titleWords.join(' ');
}

// cities come in in snakecase---convert to title for label
const prepCities = (cities) => {
    const labels = cities.map((city) => titleCase(city));
    const options = cities.map((city) => ({ label: titleCase(city), value: city }));
    const lookup = _.zipObject(cities, labels);
    return [options, lookup];
};

// topics come in json with snakecase key, display string, list of indicators
// return array of objects for selectItems
const prepTopics = (json) => {
    const topics = _.keys(json);
    const labels = topics.map((topic) => json[topic].display);
    const options = topics.map((topic) => ({ label: json[topic].display, value: topic }));
    const lookup = _.zipObject(topics, labels);
    return [options, lookup];
};

const prepNhoods = (nhoods) => {
    const options = nhoods.map((nhood) => ({ label: nhood, value: nhood }));
    return options;
};

// similar to topics. indicators in 'indicators' slot
// pass e.g. indicators['age']
// return array of objects for selectItems
const prepIndicators = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    const labels = _.map(mappable, 'display');
    const values = _.map(mappable, 'indicator');
    const options = mappable.map((indicator) => ({ label: indicator.display, value: indicator.indicator }));
    const lookup = _.zipObject(values, labels);
    return [options, lookup];
};

const getMappable = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    const avail = mappable.map((indicator) => indicator.indicator);
    return avail;
};

const getNhoods = (data) => {
    let nhoods = _.chain(data)
        // .filter((d) => _.endsWith(d.level, 'neighborhood'))
        .map('location')
        .uniq()
        .value();
    return nhoods;
}

const prepProfile = (data, nhood, meta) => {
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

const prepTable = (data, meta) => {
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
const prepChart = (data, indicator) => {
    return _.sortBy(data, [indicator]).reverse();
};

// split into series for chart
const splitSeries = (data, nhood) => {
    return _.partition(data, (d) => d.location === nhood);
};

const getTableRows = (rows) => {
    const n = rows.length;
    let pages = [10];
    if (n > 25) {
        pages.push(25);
    }
    pages.push({ value: n, label: 'All' });
    return pages;
};

const getFormatter = (meta, indicator) => {
    const m = _.find(meta, { indicator: indicator });
    return format(m.format);
};

// replace multiple patterns in single string
const abbr = (x, max) => {
    // const max = 20;
    const patts = [/South/g];
    const repls = ['S.'];
    if (x.length > max) {
        return _.reduce(patts, (acc, patt, i) => {
            return _.replace(acc, patt, repls[i]);
        }, x);
    } else {
        return x;
    }
};

const abbreviate = (max) => {
    return (x) => abbr(x, max);
};

const makeBarFill = (data, pal, hilite) => {
    // strings of levels
    const levels = _.chain(data)
        .map('level')
        .uniq()
        .value();
    // parsed numbers from levels, drop neighborhood
    const nums = _.chain(levels)
        .map((d) => d[0])
        .map((d) => _.parseInt(d))
        .dropRight(1)
        .value();
    const baseCols = _.map(nums, (d) => pal[d - 1]);
    const palette = _.concat(baseCols, hilite);
    const color = scaleOrdinal(levels, palette);
    return color;
};

const findNhood = (data, nhood) => {
    return _.findIndex(data, { location: nhood }) + 1;
};

export {
    titleCase,
    prepCities,
    prepTopics,
    prepIndicators,
    prepNhoods,
    getMappable,
    getNhoods,
    prepProfile,
    prepTable,
    prepChart,
    getTableRows,
    getFormatter,
    abbreviate,
    makeBarFill,
    splitSeries,
    findNhood,
};