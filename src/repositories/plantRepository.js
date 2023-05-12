const {Repository} = require("./index");

class PlantRepository extends Repository {
  constructor() {
    super();
    this.table = "plants";
  }

  // async findById(id) {
  //   const result = await this.__findByPrimaryKey(this.table, id);
  //   if (result === undefined) throw new BadRequest("Not Found User");
  //   return result;
  // }

  createPlant(data) {
    return this.db(this.table).returning("*").insert({
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
  getAllPlant() {
    return this.db(this.table).select("*").from("plants");   
  }
}
module.exports = PlantRepository;
