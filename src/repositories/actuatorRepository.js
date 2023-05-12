const { BadRequest } = require("../errors");
const { Repository } = require("./index");

class ActuatorRepository extends Repository {
  constructor() {
    super();
    this.table = "actuators";
  }

  async insertActuatorCommandToDB(data) {
    return this.db(this.table).returning("*").insert({
      wind_command: data.windCommand,
      water_command: data.waterCommand,
      light_command: data.lightCommand,
    });
  }

  // async saveActuatorFromMessage(message) {
  //   try {
  //     const [result, row] = await this.db(this.table).insert(message);
  //     if (row === 1) {
  //       return result;
  //     }
  //     // FIXME: row 가 == 이라면 에러입니다. 
  //     return result;
  //   } catch (err) {
  //     console.log(String(err));
  //     if (err.errno == 1062) {
  //       throw new BadRequest("Create Actuators Failed - Duplicate Email");
  //     } else {
  //       throw new BadRequest("Create Actuators Failed");
  //     }
  //   }
  // }

}

module.exports = ActuatorRepository;