const { BadRequest, InternalServerError } = require("../errors");

const ActuatorRepository = require("../repositories/actuatorRepository");

class DeviceService {
  constructor() {
    this.actuatorRepository = new ActuatorRepository();
  }

  sendMQTTByMessage(message) {
    const {device_id} = message;
    this.actuatorRepository.saveActuatorFromMessage()
  }
}

module.exports = DeviceService;