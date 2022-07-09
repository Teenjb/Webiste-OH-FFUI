const path = require('path');
const parse = require('pg-connection-string');

module.exports = ({ env }) => {
  
  if(env('NODE_ENV') === 'production') {
    const config = parse(process.env.DATABASE_URL);
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgresql',
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database
          },
          options: {
            ssl: false
          }
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
