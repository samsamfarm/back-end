const { BadRequest } = require("../errors");
const {checkMissingParamsBoolean} = require("../utils/validation");

class ActuatorCommandDTO {
  data;

  constructor(requestData) {
    const requireData = ['wind_command', 'water_command', 'light_command'];
    const errorMessage = checkMissingParamsBoolean(requestData, requireData);

    if (errorMessage) {
      throw new BadRequest(errorMessage);
    }

    this.data = {
      windCommand: requestData.wind_command,
      waterCommand: requestData.water_command,
      lightCommand: requestData.light_command,
      deviceId: requestData.device_id
    };
  }
}

module.exports = { ActuatorCommandDTO };