module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/ticket/count',
            handler: 'ticket.count',
        }
    ]
}