const path = require('path');
const parse = require('pg-connection-string');

module.exports = ({ env }) => {
  
  if(env('NODE_ENV') === 'production') {
    const config = parse(process.env.DATABASE_URL);
    return {
      defaultConnection: 'default',
        connection: {
          client: "postgres",
          connection: {
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: password: config.password,
            schema: env("DATABASE_SCHEMA", "public"),
          },
          options: {
            ssl: false
          }
        }
    };
  }

  return{
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
}};
