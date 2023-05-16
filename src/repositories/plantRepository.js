const {Repository} = require("./index");

class PlantRepository extends Repository {
  constructor() {
    super();
    this.table = "plants";
  }

  createPlant(data) {
    return this.db(this.table).insert({
      user_id: data.userId,
      device_id: data.deviceId,
      plant_type: data.plantType,
    });
  }
  getPlantByUserId(userId) {
    return this.db(this.table).select("*").where({
      user_id: userId,
    });
  }
  getAllPlant(page, perPage) {
    const offset = (page - 1) * perPage;
    
    return this.db(this.table)
      .select("*")
      .from("plants")
      .limit(perPage)
      .offset(offset);
  }
}
module.exports = PlantRepository;
