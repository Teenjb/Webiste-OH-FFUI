'use strict';

/**
 *  preorder controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = createCoreController('api::preorder.preorder', {
    async create(ctx) {
        const user = ctx.state.user;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);

            console.log(data);
            console.log(user.id);

            const entryPreorder = await strapi.service('api::preorder.preorder').create({ data, files });

            const updatePreorder = await strapi.entityService.update('api::preorder.preorder', entryPreorder.id, {
                data: {
                    user: user.id,
                }
            });

            return ctx.send({
                entryid: entryPreorder.id,
                entry: updatePreorder,
                status: 'Preorder created'
            });
        }
        else {
            return ctx.send({
                warning: 'Please add a file',
                status: 'Preorder not created'
            });
        }
    },

    async getPreorder(ctx) {
        const user = ctx.state.user;
        const preorder = await strapi.entityService.findMany('api::preorder.preorder', {
            filters: {
                user: {
                    id: user.id
                }
            },
            populate: {
                user: true,
                merchandises: true
            }
        });

        return ctx.send({
            entry: preorder,
            status: 'List preorder'
        });   
    }
});