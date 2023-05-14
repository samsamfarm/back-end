const { BadRequest, InternalServerError, Forbidden } = require("../errors");

const ActuatorRepository = require("../repositories/actuatorRepository");
const DeviceRepository = require("../repositories/deviceRepository");
const DeviceLogRepositoy = require("../repositories/deviceLogRepository")

class DeviceService {
  constructor() {
    this.actuatorRepository = new ActuatorRepository();
    this.deviceRepository = new DeviceRepository();
    this.deviceLogRepositoy = new DeviceLogRepositoy();
  }

  async sendMQTTByMessage(message) {
    await this.actuatorRepository.saveActuatorFromMessage(message);
  }

  async validateByUserIdAndDeviceId(userId, deviceId) {
    const deviceInfo = await this.deviceRepository.getDeviceById(deviceId);
    if (deviceInfo == null) {
      throw new BadRequest({device_id: 'invalid'});
    }

    if (deviceInfo.user_id !== userId) {
      throw new Forbidden({device_id: 'mismatch'});
    }
  }

  async validateDeviceId(deviceId) {
    if (!deviceId) {
      throw new BadRequest({ device_id: "invalid" });
    }
  }

  async vaildateAlreadyExistsByDeviceId(deviceId) {
    const device = await this.deviceRepository.getDeviceById(deviceId);
    if (device) {
      throw new BadRequest({ device_id: "already_exists" });
    }
  }

  async vaildateNotFoundByDeviceId(deviceId) {
    const device = await this.deviceRepository.getDeviceById(deviceId);
    if (device == null) {
      throw new BadRequest({ device_id: "not_found" });
    }
  }

  async createDevice(deviceId, userId) {
    await this.validateDeviceId(deviceId);
    await this.vaildateAlreadyExistsByDeviceId(deviceId);

    await this.deviceRepository.createDevice(
      deviceId,
      userId
    );

    await this.actuatorRepository.createActuatorByDeviceId(deviceId);
  }

  getDevices() {
    return this.deviceRepository.getDevicesOrderByAsc();
  }

  getDeviceById(deviceId) {
    return this.deviceRepository.getDeviceById(deviceId);
  }

  getDeviceLogById(deviceId) {
    return this.deviceLogRepositoy.getDeviceLogById(deviceId);
  }

  getDeviceByUserId(userId) {
    const deviceInfo = this.deviceRepository.getDeviceByUserId(userId);
    if (deviceInfo == null) {
      return null;
    }

    return deviceInfo;
  }
}

module.exports = DeviceService;
