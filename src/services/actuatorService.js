const { BadRequest, InternalServerError } = require("../errors");

const ActuatorRepository = require("../repositories/actuatorRepository");

class ActuatorService {
  constructor() {
    this.actuatorRepository = new ActuatorRepository();
  }

  insertActuatorCommandToDB(data) {
    return this.actuatorRepository.insertActuatorCommandToDB(data);
  }
}

module.exports = ActuatorService;