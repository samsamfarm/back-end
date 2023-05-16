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
  
  async getPlantByUserId(userId) {
    const result = await this.db(this.table)
      .join("users", "plants.user_id", "=", "users.id")
      .select(
        "plants.*",
        "users.nickname as nickname",
        "users.mbti as mbti")
      .where({ user_id: userId});

    return result
  }

  getAllPlant(page, perPage) {
    const offset = (page - 1) * perPage;
    
    return this.db(this.table)
      .join("users", "plants.user_id", "=", "users.id")
      .select("plants.*", "users.nickname as nickname")
      .limit(perPage)
      .offset(offset);
  }
}
module.exports = PlantRepository;
