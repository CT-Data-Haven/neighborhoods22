import _ from 'lodash';
import {titleCase} from './strings';

// cities come in in snakecase---convert to title for label
export const prepCities = (cities) => {
    const labels = cities.map((city) => titleCase(city));
    const options = cities.map((city) => ({ label: titleCase(city), value: city }));
    const lookup = _.zipObject(cities, labels);
    return [options, lookup];
};

// topics come in json with snakecase key, display string, list of indicators
// return array of objects for selectItems
export const prepTopics = (json) => {
    const topics = _.keys(json);
    const labels = topics.map((topic) => json[topic].display);
    const options = topics.map((topic) => ({ label: json[topic].display, value: topic }));
    const lookup = _.zipObject(topics, labels);
    return [options, lookup];
};

export const prepNhoods = (nhoods) => {
    const options = nhoods.map((nhood) => ({ label: nhood, value: nhood }));
    return options;
};

// similar to topics. indicators in 'indicators' slot
// pass e.g. indicators['age']
// return array of objects for selectItems
export const prepIndicators = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    const labels = _.map(mappable, 'display');
    const values = _.map(mappable, 'indicator');
    const options = mappable.map((indicator) => ({ label: indicator.display, value: indicator.indicator }));
    const lookup = _.zipObject(values, labels);
    return [options, lookup];
};

export const getNhoods = (data) => {
    let nhoods = _.chain(data)
        // .filter((d) => _.endsWith(d.level, 'neighborhood'))
        .map('location')
        .uniq()
        .value();
    return nhoods;
};

export const findNhood = (data, nhood) => {
    return _.findIndex(data, { location: nhood }) + 1;
};