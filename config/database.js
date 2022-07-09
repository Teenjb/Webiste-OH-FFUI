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
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
          database: process.env.DATABASE_DATA,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
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
