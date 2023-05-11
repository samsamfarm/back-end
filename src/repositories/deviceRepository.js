const { Repository } = require("./index");
const { BadRequest } = require("../errors");

class DeviceRepository extends Repository {
  constructor() {
    super();
      this.logTable = "device_logs";
      this.determineTable = "log_determines";
  }
 
  async filterData({
    temperature, humid, bright, moisture
  }) {
    try {
      await this.db(this.determineTable).insert({
        temperature_state: temperature >= 30 ? "red" : "green",
        humid_state: humid >= 80 ? "red" : "green",
        bright_state: bright >= 800 ? "red" : "green",
        moisture_state: moisture >= 800 ? "red" : "green",
      });
    } catch(error) {
      onsole.log(String(error));
      if (err.errno == 1062) {
        throw new BadRequest("Create Actuators Failed - Duplicate Email");
      } else {
        throw new BadRequest("Create Actuators Failed");
      }
    }
  }

}


module.exports = DeviceRepository;
