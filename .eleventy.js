const glob = require('fast-glob');
// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
    eleventyConfig.addWatchTarget('./src/js/');
    eleventyConfig.addWatchTarget('./src/scss/');
    if (!isProduction) {
        eleventyConfig.addPassthroughCopy('./src/css');
    }
    eleventyConfig.addPassthroughCopy('./src/img/');
    eleventyConfig.addPassthroughCopy('./src/js/');

    // Filters
    glob.sync(['src/filters/*.js']).forEach((file) => {
        let filters = require(`./${file}`);
        Object.keys(filters).forEach((name) =>
            eleventyConfig.addFilter(name, filters[name])
        );
    });

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: '_site',
        },
    };
};
