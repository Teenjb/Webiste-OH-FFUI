const path = require("path");
const parse = require("pg-connection-string");

module.exports = ({ env }) => {
  return {
    defaultConnection: "default",
    connection: {
      client: "postgres",
      connection: {
        host: process.env.DATABASE_HOST,
        port: 5432,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      debug: false,
    },
  };
};
