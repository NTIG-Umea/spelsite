module.exports = {
    getTeam: (teams, teamname) => teams.filter(t => t.team === teamname)[0],
    listCreators: (creators) => {
        return typeof creators === 'object' ? creators.sort().join(', ') : creators
    },
}
