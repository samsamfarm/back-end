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
  }

  async vaildateAlreadyExistsByDeviceId(deviceId) {
    const device = await this.deviceRepository.getDeviceById(deviceId);
    if (device) {
      throw new BadRequest({device_id: "already_exists"});
    }
  }

  async vaildateNotFoundByDeviceId(deviceId) {
    const device = await this.deviceRepository.getDeviceById(deviceId);
    if (device == null) {
      throw new BadRequest({device_id: "not_found"});
    }
  }

  async createDevice(deviceId, userId) {
    await this.validateDeviceId(deviceId);
    await this.vaildateAlreadyExistsByDeviceId(deviceId);

    const createDeviceInfo = await this.deviceRepository.createDevice(deviceId, userId);
    if (createDeviceInfo.length === 1) {
      return createDeviceInfo;
    }
    
    throw new InternalServerError({device: "create_failed"});
  }

  getDevices() {
    return this.deviceRepository.getDevicesOrderByAsc();
  }

  getDeviceById(deviceId) {
    return this.deviceRepository.getDeviceById(deviceId);
  }
}

module.exports = DeviceService;
