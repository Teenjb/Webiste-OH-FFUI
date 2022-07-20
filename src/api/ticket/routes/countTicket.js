module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/tickets/count',
            handler: 'ticket.count',
        }
    ]
}