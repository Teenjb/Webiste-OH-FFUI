'use strict';

/**
 *  ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
var FormData = require('form-data');

module.exports = createCoreController('api::ticket.ticket', {
    async count(ctx) {
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
        const { user } = ctx.state;

        //Kalau post form data
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);

            console.log(files);
            console.log(user.id);

            const entryImage = await strapi.service('api::ticket.ticket').create({ data, files });
            
            const updateEntry = await strapi.entityService.update('api::ticket.ticket', entryImage.id, {
                data: {
                    user: user.id
                },
            });

            return ctx.send({
                entry: updateEntry,
                status: 'Ticket created'
            })
        }
        //Kalau post raw data
        else {
            const { ticketID, ticketType } = ctx.request.body.data;

            console.log(ticketID);
            console.log(ticketType);

            const entrySingle = await strapi.entityService.create('api::ticket.ticket', {
                data: {
                    ticketID: ticketID,
                    ticketType: ticketType,
                    user: user.id
                }
            });

            return ctx.send({
                entry: entrySingle,
                status: 'Ticket created'
            })
        }
    }
});