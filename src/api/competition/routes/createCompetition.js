module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/competitions/create',
            handler: 'competition.create',
        }
    ]
}