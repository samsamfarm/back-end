const { BadRequest, InternalServerError } = require("../errors");

const PlantRepository = require("../repositories/plantRepository");

class PlantService {
  constructor() {
    this.plantRepository = new PlantRepository();
  }

  // findUserByPlantId(id) {
  //   return this.repository.findById(id);
  // }

  async createPlant(data) {
    const newPlantData = await this.plantRepository.createPlant(data);
    if (newPlantData?.length > 0) {
      return newPlantData;
    }

    throw new InternalServerError({device: "create_failed"});
  }

  async getPlantByUserId(userId) {
    const plantInfoByUserId = await this.plantRepository.getPlantByUserId(userId);
    if (plantInfoByUserId?.length > 0) {
      return plantInfoByUserId;
    }

    throw new BadRequest({plant: "not_found"});
  }
  getAllPlant() {
    const getPlants = this.plantRepository.getAllPlant();
      return getPlants;
  }

}

module.exports = PlantService;
