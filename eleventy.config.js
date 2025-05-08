import MarkdownIt from 'markdown-it';
import fs from 'fs';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';


export default function (eleventyConfig) {
    eleventyConfig.addWatchTarget('./src/js/')
    eleventyConfig.addWatchTarget('./src/scss/')
    if (!isProduction) {
        eleventyConfig.addPassthroughCopy('./src/css')
    }

    eleventyConfig.addPlugin(eleventyImageTransformPlugin)

    eleventyConfig.addFilter('getTeam', (teams, teamname) => {
        return teams.filter(t => t.team === teamname)[0]
    });
    eleventyConfig.addFilter('listCreators', (creators) => {
        return typeof creators === 'object' ? creators.sort().join(', ') : creators
    });
    eleventyConfig.addFilter('randomize', (arr) => {
        return arr.sort(() => 0.5 - Math.random());
    }
    );
    eleventyConfig.addFilter('hearts', (arr) => {
        return Array.isArray(arr) ? arr.join(' ♥ ') : ' ♥ ';
    });

    const mdRender = new MarkdownIt();
    eleventyConfig.addFilter('renderUsingMarkdown', function (rawString) {
        return mdRender.render(rawString);
    });


    const year = () => `${new Date().getFullYear()}`
    eleventyConfig.addShortcode('year', year)

    eleventyConfig.addPassthroughCopy('./src/img/')
    eleventyConfig.addPassthroughCopy('./src/js/')
    eleventyConfig.addPassthroughCopy('src/robots.txt')
    eleventyConfig.addPassthroughCopy('./src/favicon.ico')

    // 404
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: (err, bs) => {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('_site/404.html');
                    // Add 404 http status code in request header.
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        templateFormats: ["njk", "md"],
        markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "public",
        },
        passthroughFileCopy: true,
    }
};
