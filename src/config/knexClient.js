require("dotenv").config();
const knex = require("knex");

// Reference : https://knexjs.org/guide/
class KnexClient {
  constructor() {
    const config = {
      client: "mysql2",
      debug: process.env.DB_DEBUG_MODE == 0 ? true : false,
      connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PW,
        database: process.env.MYSQL_DB,
        port: process.env.MYSQL_PORT || 3306,
      },
      asyncStackTraces: true,
      pool: {
        min: 0,
        max: 10,
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
    };

    this.db = knex(config);

  }

  static getInstance() {
    if (!KnexClient.instance) {
      KnexClient.instance = new KnexClient();
    }

    return KnexClient.instance;
  }
}

const knexClient = KnexClient.getInstance().db;

process.on('SIGINT', () => {
  knexClient.destroy(() => {
    console.log("Knex connection pool has been closed.");
    process.exit(0);
  })
})

module.exports = knexClient;
