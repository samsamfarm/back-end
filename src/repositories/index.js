const knexClient = require("../config/knexClient");

const userRepository = require("./userRepository");


class Repository {
  constructor() {
    this.db = knexClient;
  }

  __findByPrimaryKey(table, id) {
    return this.db(table).where("id", id).first();
  }
}

module.exports = {
  Repository,
  userRepository,
};
