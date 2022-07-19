'use strict';

/**
 *  ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', {
    count(ctx) {
        var { query } = ctx.request
        return strapi.entityService.count('api::ticket.ticket', query);
    }
});