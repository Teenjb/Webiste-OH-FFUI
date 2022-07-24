'use strict';

/**
 *  ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', {
    async count(ctx) {
        var { query } = ctx.request;
        const countOnline = await strapi.db.query('api::ticket.ticket').count ({
            where: {
                ticketType: 'Online'
            }
        });
        
        const countHybrid = await strapi.db.query('api::ticket.ticket').count ({
            where: {
                ticketType: 'Hybrid'
            }
        });

        if (countOnline < 500) {
            if (countHybrid < 75) {
                return ctx.send({
                    countOnline: countOnline,
                    statusOnline: 'Online available',
                    countHybrid: countHybrid,
                    statusHybrid: 'Hybrid available'
                });
            }
            else if (countHybrid >= 75) {
                return ctx.send({
                    countOnline: countOnline,
                    statusOnline: 'Online available',
                    countHybrid: countHybrid,
                    statusHybrid: 'Hybrid unavailable'
                });
            }
        }
        else {
            if (countHybrid < 75) {
                return ctx.send({
                    countOnline: countOnline,
                    statusOnline: 'Online unavailable',
                    countHybrid: countHybrid,
                    statusHybrid: 'Hybrid available'
                });
            }
            else if (countHybrid >= 75) {
                return ctx.send({
                    countOnline: countOnline,
                    statusOnline: 'Online unavailable',
                    countHybrid: countHybrid,
                    statusHybrid: 'Hybrid unavailable'
                });
            }
        }
    },

    async create(ctx) {
        const { ticketID, ticketType } = ctx.request.body.data;
        const { user } = ctx.state;
        
        console.log(ticketID);
        console.log(ticketType);
        console.log(user.id);
        
        const entry = await strapi.entityService.create('api::ticket.ticket', {
            data: {
                ticketID: ticketID,
                ticketType: ticketType,
                user: user.id
            }
        });

        return ctx.send({
            entry: entry,
            status: 'Ticket created'
        })
    }
});