module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/competitions/checkMyCompetition',
            handler: 'competition.checkMyCompetition',
        }
    ]
}