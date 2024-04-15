export * from './data';
export * from './geos';
export * from './strings';
export * from './ui';
// const makeBarFill = (data, pal, hilite) => {
//     // strings of levels
//     const levels = _.chain(data)
//         .map('level')
//         .uniq()
//         .value();
//     // parsed numbers from levels, drop neighborhood
//     const nums = _.chain(levels)
//         .map((d) => d[0])
//         .map((d) => _.parseInt(d))
//         .dropRight(1)
//         .value();
//     const baseCols = _.map(nums, (d) => pal[d - 1]);
//     const palette = _.concat(baseCols, hilite);
//     const color = scaleOrdinal(levels, palette);
//     return color;
// };


// export {
//     titleCase,
//     prepCities,
//     prepTopics,
//     prepIndicators,
//     prepNhoods,
//     getMappable,
//     getNhoods,
//     prepProfile,
//     prepTable,
//     prepChart,
//     getTableRows,
//     getFormatter,
//     abbreviate,
//     makeBarFill,
//     splitSeries,
//     findNhood,
// };