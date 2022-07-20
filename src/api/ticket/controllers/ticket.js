'use strict';

/**
 *  ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', {
    async count(ctx) {
        var { query } = ctx.request;
        const count = await strapi.db.query('api::ticket.ticket').count( query );

        console.log(query.ticketType)
        console.log(count)

        if (query.ticketType == 'Online') {
            if (count < 500) {
                ctx.send({
                    count: count,
                    status: 'Online ticket is available'
                })
            } else {
                ctx.send({
                    count: count,
                    status: 'Online ticket is already sold out'
                })
            }
        }
        else if (query.ticketType == 'Hybrid') {
            if (count < 75) {
                ctx.send({
                    count: count,
                    status: 'Hybrid ticket is available'
                })
            } else {
                ctx.send({
                    count: count,
                    status: 'Hybrid ticket is already sold out'
                })
            }
        }
        else {
            return strapi.badRequest('Ticket type is not valid')
        }
    }
});