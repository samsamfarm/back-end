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

}

module.exports = ActuatorRepository;