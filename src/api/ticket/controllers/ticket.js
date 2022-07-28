'use strict';

/**
 *  ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

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

            const entryTicket = await strapi.service('api::ticket.ticket').create({ data, files });
            
            const updateTicket = await strapi.entityService.update('api::ticket.ticket', entryTicket.id, {
                data: {
                    user: user.id
                },
            });

            return ctx.send({
                entry: updateTicket,
                status: 'Ticket created'
            })
        }
        //Kalau post raw data
        // else {
        //     //Temporary biar bisa post tanpa gambar dulu
        //     const { ticketID, ticketType } = ctx.request.body.data;

        //     console.log(ticketID);
        //     console.log(ticketType);

        //     const entrySingle = await strapi.entityService.create('api::ticket.ticket', {
        //         data: {
        //             ticketID: ticketID,
        //             ticketType: ticketType,
        //             user: user.id
        //         }
        //     });

        //     return ctx.send({
        //         entry: entrySingle,
        //         status: 'Ticket created'
        //     })
        // }
    },

    async getTicket(ctx) {
        const user = ctx.state.user;
        const ticket = await strapi.entityService.findMany('api::ticket.ticket', {
            filters: {
                user: {
                    id: user.id
                }
            },
            populate: {
                user: true
            }
        });

        return ctx.send({
            entry: ticket,
            status: 'List ticket'
        });   
    }
});