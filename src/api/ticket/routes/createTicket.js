module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/tickets/create',
            handler: 'ticket.create',
        }
    ]
}