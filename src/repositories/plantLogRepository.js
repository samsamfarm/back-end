const { Repository } = require("./index");

class plantLogRepository extends Repository {
  constructor() {
    super();
    this.table = "plant_grade_logs";
  }

  createPlantGradeLog(plantId) {

    return this.db(this.table).insert({
      plant_id: plantId,
      current_grade: "1",
      current_grade_arrive_date: this.db.fn.now()
    });
    
  }

//  async updateCurrentGrade() {

//   const currentTime = new Date();
  
//   const a = this.db(this.table)
//     .update({
//       current_grade: this.db.raw(`
//       CASE 
//         WHEN TIMESTAMPDIFF(DAY, plants.created_at, NOW()) >= 8 THEN '4'
//         WHEN TIMESTAMPDIFF(DAY, plants.created_at, NOW()) >= 4 THEN '3'
//         WHEN TIMESTAMPDIFF(DAY, plants.created_at, NOW()) >= 2 THEN '2'
//         ELSE '1'
//       END
//      `),
//       current_grade_arrive_date: currentTime,
//     })
//     .where("growth_stage", "<>", "4");

//   await this.db(this.table)
//     .update({ last_grade_arrive_date: currentTime })
//     .where("current_grade", "4")
//     .andWhere("last_grade_arrive_date", null) 
//   }

}

module.exports = plantLogRepository;