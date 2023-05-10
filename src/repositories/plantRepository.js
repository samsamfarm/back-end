const { BadRequest } = require("../errors");

class PlantRepository {
  constructor() {
    this.table = "plants";
  }

  async findById(id) {
    const result = await this.__findByPrimaryKey(this.table, id);
    if (result === undefined) throw new BadRequest("Not Found User");
    return result;
  }


  async create(plant) {
    const userId = await this.db(this.table)
      .insert(plant)
      .catch((error) => {
        console.log(String(error));
        if (error.errno == 1062) {
          throw new BadRequest("Create Plant Failed - Duplicate Email");
        } else {
          throw new BadRequest("Create Plant Failed");
        }
      });

      const result = await this.findById(userId[0]);
      return result;
  }
  
  async getPlant() {
    // 
  }

}

module.exports = PlantRepository;