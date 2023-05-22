const ActuatorRepository = require("../repositories/actuatorRepository");
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