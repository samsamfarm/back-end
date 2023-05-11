const { BadRequest, InternalServerError } = require("../errors");

const ActuatorRepository = require("../repositories/actuatorRepository");
const DeviceRepository = require("../repositories/deviceRepository");

class DeviceService {
  constructor() {
    this.actuatorRepository = new ActuatorRepository();
    this.deviceRepository = new DeviceRepository();
  }

  async sendMQTTByMessage(message) {
    await this.actuatorRepository.saveActuatorFromMessage(message)
  }

  async validateDeviceId(deviceId) {
    if (!deviceId) {
      throw new BadRequest({device_id: 'invalid'});
    }

    // TODO: deviceRepository.getDeviceById 작성 해야함
    const device = await this.deviceRepository.getDeviceById(deviceId);
    if (device) {
      throw new BadRequest({device_id: "already_exists"});
    }
  }

  async createDevice(deviceId, userId) {
    await this.validateDeviceId(deviceId);

    const createDeviceInfo = await this.deviceRepository.createDevice(deviceId, userId);
    if (createDeviceInfo == null) {
      throw new InternalServerError({device: "create_failed"});
    }

    return createDeviceInfo;
  }
}

module.exports = DeviceService;