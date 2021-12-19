const fs = require('fs');

const getTeam = (teams, teamname) => {
    return teams.filter(t => t.team === teamname);
};

module.exports = { getTeam };
