const ActuatorRepository = require("../repositories/actuatorRepository");
const DeviceRepository = require("../repositories/deviceRepository");

const {BadRequest} = require("../errors");


class ActuatorService {
  constructor() {
    this.actuatorRepository = new ActuatorRepository();
  }

  getActuatorsByUserId(userId) {
    return this.actuatorRepository.getActuatorsByUserId(userId);
  }

  updateActuatorCommandToDB(data) {
    return this.actuatorRepository.updateActuatorCommandToDB(data);
  }
}

module.exports = ActuatorService;