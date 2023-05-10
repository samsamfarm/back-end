const { BadRequest } = require("../errors");

class ActuatorRepository {
  constructor() {
    this.table = "actuators";
  }

  async findById(id) {
    const result = await this.__findByPrimaryKey(this.table, id);
    if (result === undefined) throw new BadRequest("Not Found User");
    return result;
  }

  saveActuatorFromMessage(message) {
    try {
      return this.db(this.table).insert({message});
    } catch (err) {
      console.log(String(err));
      if (err.errno == 1062) {
        throw new BadRequest("Create Actuators Failed - Duplicate Email");
      } else {
        throw new BadRequest("Create Actuators Failed");
      }
    }
  }
}

module.exports = ActuatorRepository;