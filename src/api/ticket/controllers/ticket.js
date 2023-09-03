"use strict";

/**
 *  ticket controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = createCoreController("api::ticket.ticket", {
  async count(ctx) {
    const countDay1 = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Day 1",
      },
    });

    const countDay2 = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Day 2",
      },
    });

    const countDay2No = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Day 2 (no workshop)",
      },
    });

    const countBundle = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Bundle",
      },
    });

    const countBundleNo = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Bundle (no workshop)",
      },
    });

    return ctx.send({
      countDay1: countDay1,
      countDay2: countDay2,
      countDay2No: countDay2No,
      countBundle: countBundle,
      countBundleNo: countBundleNo,
    });
  },

  async create(ctx) {
    const { user } = ctx.state;
    const stock = {
      "Day 1": 150,
      "Day 2": 150,
      "Day 2 (no workshop)": 50,
      "Bundle": 50,
      "Bundle (no workshop)": 50,
    }

    if (!user) {
      return ctx.unauthorized();
    }
    //Kalau post form data
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      if (files.paymentPhoto.size > 0) {
        if (data.ticketType.length === 0) {
          return ctx.badRequest("Ticket type is required");
        }

        const count = await strapi.db.query("api::ticket.ticket").count({
          where: {
            ticketType: `${data.ticketType}`,
          },
        });

        if (count < stock[data.ticketType]) {
          const entryTicket = await strapi
            .service("api::ticket.ticket")
            .create({ data, files });

          const updateTicket = await strapi.entityService.update(
            "api::ticket.ticket",
            entryTicket.id,
            {
              data: {
                user: user.id,
              },
            }
          );

          return ctx.send({
            entry: updateTicket,
            status: "Ticket created",
          });
        } else {
          return ctx.badRequest("Ticket type is sold out");
        }
      }else{
        return ctx.badRequest("Please add a file");
      }
    }
  },

  async getTicket(ctx) {
    const user = ctx.state.user;
    const ticket = await strapi.entityService.findMany("api::ticket.ticket", {
      filters: {
        user: {
          id: user.id,
        },
      },
      populate: {
        user: true,
      },
    });

    return ctx.send({
      entry: ticket,
      status: "List ticket",
    });
  },
});
