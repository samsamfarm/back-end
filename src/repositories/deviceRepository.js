const { Repository } = require("./index");
const { BadRequest } = require("../errors");

class DeviceRepository extends Repository {
  constructor() {
    super();
    this.table = "devices"
  }
 
  createDevice(deviceId, userId) {
    return this.db(this.table).returning('*').insert({ user_id: userId, id: deivceId });
  }

  getDeviceById(deviceId) {
    return this.db(this.table).where({ id: deviceId }).first();

  }
}


module.exports = DeviceRepository;
