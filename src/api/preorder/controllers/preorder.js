"use strict";

/**
 *  preorder controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = createCoreController("api::preorder.preorder", {
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      
      if (files.paymentPhoto.size>0) {
        const entryPreorder = await strapi
          .service("api::preorder.preorder")
          .create({ data, files });
        const updatePreorder = await strapi.entityService.update(
          "api::preorder.preorder",
          entryPreorder.id,
          {
            data: {
              user: user.id,
            },
          }
        );

        return ctx.send({
          entryid: entryPreorder.id,
          entry: updatePreorder,
          status: "Preorder created",
        });
      }
      else{
        return ctx.badRequest("Please add a file");
      }
    } else {
        return ctx.badRequest("Please add a file");
    }
  },

  async getPreorder(ctx) {
    const user = ctx.state.user;
    const preorder = await strapi.entityService.findMany(
      "api::preorder.preorder",
      {
        filters: {
          user: {
            id: user.id,
          },
        },
        populate: {
          user: true,
          merchandises: true,
        },
      }
    );

    return ctx.send({
      entry: preorder,
      status: "List preorder",
    });
  },
});
