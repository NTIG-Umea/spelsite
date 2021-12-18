const fs = require('fs');

const gameData = (game, year) => {
    // const gameData = JSON.parse(fs.readFileSync(`./src/_data/y${year}.json`));
    console.log(game);
    return game;
};

module.exports = { gameData };
