const { BadRequest, InternalServerError } = require("../errors");

const ActuatorRepository = require("../repositories/actuatorRepository");

class DeviceService {
  constructor() {
    this.actuatorRepository = new ActuatorRepository();
  }

  async sendMQTTByMessage(message) {
    await this.actuatorRepository.saveActuatorFromMessage(message)
  }
}

module.exports = DeviceService;