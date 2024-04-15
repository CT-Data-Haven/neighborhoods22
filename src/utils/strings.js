import _ from 'lodash';
import { format } from 'd3-format';

// convert snakecase to title case
export const titleCase = (text) => {
    const words = _.words(text);
    const titleWords = words.map((word) => _.upperFirst(word));
    return titleWords.join(' ');
};

export const getFormatter = (meta, indicator) => {
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

export const abbreviate = (max) => {
    return (x) => abbr(x, max);
};