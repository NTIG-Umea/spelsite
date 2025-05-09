const getimage = require('@zvorak/getimage');

process.setMaxListeners(0);

const urls = [
    'https://nonsensicalquagga.github.io/wu1-clicker/',
];
const previewPath = './src/previews';

urls.forEach(async (url, index) => {
    await getimage(url, previewPath)
        .then((fname) => {
            console.log(`${fname} fetched from ${url}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('\n');
        });
});