const glob = require('fast-glob');
const fs = require('fs');
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
    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');
    // Filters
    glob.sync(['src/filters/*.js']).forEach((file) => {
        let filters = require(`./${file}`);
        Object.keys(filters).forEach((name) =>
            eleventyConfig.addFilter(name, filters[name])
        );
    });

    const MarkdownIt = require('markdown-it');
    const mdRender = new MarkdownIt();
    eleventyConfig.addFilter('renderUsingMarkdown', function (rawString) {
        return mdRender.render(rawString);
    });

    const year = () => {
        return `${new Date().getFullYear()}`;
    };
    eleventyConfig.addShortcode('year', year);

    // 404
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: (err, bs) => {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('_site/404.html');
                    // Add 404 http status code in request header.
                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=UTF-8',
                    });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: '_site',
        },
    };
};
