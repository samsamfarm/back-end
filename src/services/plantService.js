const { BadRequest } = require("../errors");

const PlantRepository = require("../repositories/plantRepository");
const PlantGradeLogRepository = require("../repositories/plantLogRepository")

class PlantService {
  constructor() {
    this.plantRepository = new PlantRepository();
    this.plantGradeLogRepository = new PlantGradeLogRepository();
  }

  createPlant(data) {
    return this.plantRepository.createPlant(data);
  }

  returnPlantId() {
    return this.plantRepository.returnPlantId();
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

  createPlantGradeLog(plantId) {
    return this.plantGradeLogRepository.createPlantGradeLog(plantId);
  }

  updateCurrentGrade() {

    return this.plantGradeLogRepository.updateCurrentGrade();

  }
}

module.exports = PlantService;
