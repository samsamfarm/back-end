const { Repository } = require("./index");

class DeviceLogRepositoy extends Repository {
  constructor() {
    super();
    this.table = "device_logs";
  }

  async getDeviceLogById(device_id) {
    const deviceLog = await this.db(this.table)
      .join("devices", "device_logs.device_id", "=", "devices.id")
      .select(
        "device_logs.temperature",
        "device_logs.humid",
        "device_logs.moisture",
        "device_logs.bright",
        "devices.id"
      )
      .where("devices.id", device_id)
      .orderBy("device_logs.created_at", "desc")
      .first();

      if (deviceLog == null) {
        return null;
      }

      return deviceLog;
  }
}

module.exports = DeviceLogRepositoy;
