const { BadRequest, InternalServerError } = require("../errors");

const PlantRepository = require("../repositories/plantRepository");

class PlantService {
  constructor() {
    this.plantRepository = new PlantRepository();
  }

  findUserByPlantId(id) {
    return this.repository.findById(id);
  }

  async createPlant(plant) {
    return this.plantRepository.create(plant);
  }
}

module.exports = PlantService;
