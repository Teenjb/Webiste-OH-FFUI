'use strict';

/**
 *  competition controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = createCoreController('api::competition.competition', {
    async create(ctx) {
        const { user } = ctx.state;
        
    }
});
