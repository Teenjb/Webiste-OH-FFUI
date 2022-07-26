module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/competition/create',
            handler: 'competition.create',
        }
    ]
}