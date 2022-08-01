'use strict';

/**
 *  competition controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = createCoreController('api::competition.competition', {
    async create(ctx) {
        const { user } = ctx.state;

        if (!user) {
            return ctx.unauthorized();
        }

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            
            const checkCompetition = await strapi.db.query('api::competition.competition').findMany({
                where: {
                    users_permissions_user: user.id,
                    jenisLomba: data.jenisLomba
                }
            });

            console.log(checkCompetition);

            if (checkCompetition.length > 0) {
                return ctx.send({
                    status: 'Competition already exists'
                });
            }
            else {
                const inputCompetition = await strapi.service('api::competition.competition').create({ data, files });

                const updateCompetition = await strapi.entityService.update('api::competition.competition', inputCompetition.id, {
                    data: {
                        users_permissions_user: user.id
                    },
                });
    
                return ctx.send({
                    entry: updateCompetition,
                    status: 'Competition created'
                })
            }
        }
    },

    async checkMyCompetition(ctx) {
        const { user } = ctx.state;

        if (!user) {
            return ctx.unauthorized();
        }

        const checkCompetition = await strapi.db.query('api::competition.competition').findMany({
            where: {
                users_permissions_user: user.id
            }
        });

        if (checkCompetition.length > 0) {
            return ctx.send({
                entry: checkCompetition,
                status: 'Competition exists'
            });
        }
        else {
            return ctx.send({
                status: 'Competition not exists'
            });
        }
    }
});
