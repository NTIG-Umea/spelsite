import getimage from "@zvorak/getimage"

process.setMaxListeners(0);

const urls = [
    ""
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