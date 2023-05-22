const { Repository } = require("./index");

class DeviceRepository extends Repository {
  constructor() {
    super();
    this.table = "devices"
  }
 
  createDevice(deviceId, userId) {
    return this.db(this.table).insert({ user_id: userId, id: deviceId });
  }

  getDeviceByUserId(userId) {
    return this.db(this.table).where({ user_id: userId }).first();
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
