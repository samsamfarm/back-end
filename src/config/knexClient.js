require("dotenv").config();
const knex = require("knex");
const config = require("../../knexfile")[process.env.NODE_ENV || "development"];

// Reference : https://knexjs.org/guide/
class KnexClient {
  constructor() {
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
