require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    debug: process.env.DB_DEBUG_MODE == 0 ? true : false,
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DB,
      port: process.env.MYSQL_PORT,
    },
    asyncStackTraces: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    log: {
      warn(msg) {
        console.warn(msg);
      },
      error(msg) {
        console.error(msg);
      },
      deprecate(msg) {
        console.log(msg);
      },
      debug(msg) {
        console.log(msg);
      },
    },
  },
  staging: {
    client: 'mysql2',
    debug: process.env.DB_DEBUG_MODE == 0 ? true : false,
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DB,
      port: process.env.MYSQL_PORT,
    },
    asyncStackTraces: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    log: {
      warn(msg) {
        console.warn(msg);
      },
      error(msg) {
        console.error(msg);
      },
      deprecate(msg) {
        console.log(msg);
      },
      debug(msg) {
        console.log(msg);
      },
    },
  },
  production: {
    client: 'mysql2',
    debug: process.env.DB_DEBUG_MODE == 0 ? true : false,
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DB,
      port: process.env.MYSQL_PORT,
    },
    asyncStackTraces: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    log: {
      warn(msg) {
        console.warn(msg);
      },
      error(msg) {
        console.error(msg);
      },
      deprecate(msg) {
        console.log(msg);
      },
      debug(msg) {
        console.log(msg);
      },
    },
  }
};
