const { Repository } = require("./index");
const { BadRequest } = require("../errors");

class DeviceRepository extends Repository {
  constructor() {
    super();
    this.table = "devices"
  }
 
  async createDevice(deviceId, userId) {
    return this.db(this.table).returning('*').insert({ user_id: userId, id: deviceId });
  }

  getDeviceById(deviceId) {
    return this.db(this.table).where({ id: deviceId }).first();
  }

  getDevicesOrderByAsc() {
    // NOTE: created_at 가장 오래된 순으로 정렬
    return this.db(this.table).select().orderBy('created_at', 'asc');
  }
  

}


module.exports = DeviceRepository;
