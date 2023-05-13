const { Repository } = require("./index");

class ActuatorRepository extends Repository {
  constructor() {
    super();
    this.table = "actuators";
  }

  async updateActuatorCommandToDB(data) {
    return this.db(this.table).update({
      wind_command: data.windCommand,
      water_command: data.waterCommand,
      light_command: data.lightCommand
    }).where("device_id", data.deviceId);
  }

  createActuatorByDeviceId(deviceId) {
    try {
      return this.db(this.table).insert({ 
        device_id: deviceId
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getActuatorsByUserId(userId) {
    return this.db(this.table)
      .join("devices", "devices.id", "=", `${this.table}.device_id`)
      .select(
        `${this.table}.*`
      )
      .where("devices.user_id", userId)
      .first();
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