module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/tickets/getTicket',
            handler: 'ticket.getTicket',
        }
    ]
}