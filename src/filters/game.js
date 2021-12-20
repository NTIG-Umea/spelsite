module.exports = {
    getTeam: (teams, teamname) => teams.filter(t => t.team === teamname)[0],
    getCreators: (creators) => typeof creators === 'object' ? creators.join(', ') : creators,
}
