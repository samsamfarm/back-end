const { BadRequest } = require("../errors");

const PlantRepository = require("../repositories/plantRepository");

class PlantService {
  constructor() {
    this.plantRepository = new PlantRepository();
  }

  createPlant(data) {
    return this.plantRepository.createPlant(data);
  }

  async getPlantByUserId(userId) {
    const plantInfoByUserId = await this.plantRepository.getPlantByUserId(
      userId
    );
    if (plantInfoByUserId?.length > 0) {
      return plantInfoByUserId;
    }

    throw new BadRequest({ plant: "not_found" });
  }
  getAllPlant(page, perPage) {
    const getPlants = this.plantRepository.getAllPlant(page, perPage);
    return getPlants;
  }
}

module.exports = PlantService;
