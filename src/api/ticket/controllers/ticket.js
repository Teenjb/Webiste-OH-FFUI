"use strict";

/**
 *  ticket controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = createCoreController("api::ticket.ticket", {
  async count(ctx) {
    const countOnline = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Online",
      },
    });

    const countHybrid = await strapi.db.query("api::ticket.ticket").count({
      where: {
        ticketType: "Hybrid",
      },
    });

    if (countOnline < 500) {
      if (countHybrid < 100) {
        return ctx.send({
          countOnline: countOnline,
          statusOnline: "Online available",
          countHybrid: countHybrid,
          statusHybrid: "Hybrid available",
        });
      } else if (countHybrid >= 100) {
        return ctx.send({
          countOnline: countOnline,
          statusOnline: "Online available",
          countHybrid: countHybrid,
          statusHybrid: "Hybrid unavailable",
        });
      }
    } else {
      if (countHybrid < 100) {
        return ctx.send({
          countOnline: countOnline,
          statusOnline: "Online unavailable",
          countHybrid: countHybrid,
          statusHybrid: "Hybrid available",
        });
      } else if (countHybrid >= 100) {
        return ctx.send({
          countOnline: countOnline,
          statusOnline: "Online unavailable",
          countHybrid: countHybrid,
          statusHybrid: "Hybrid unavailable",
        });
      }
    }
  },

  async create(ctx) {
    const { user } = ctx.state;

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

        const countOnline = await strapi.db.query("api::ticket.ticket").count({
          where: {
            ticketType: "Online",
          },
        });

        const countHybrid = await strapi.db.query("api::ticket.ticket").count({
          where: {
            ticketType: "Hybrid",
          },
        });

        if (data.ticketType === "Online" && countOnline < 500) {
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
        } else if (data.ticketType === "Hybrid" && countHybrid < 100) {
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
