const knex = require("./dbConnection");

/**
 * @swagger
 * components:
 *   schemas:
 *     plant_grade_logs:
 *       type: object
 *       required:
 *         - current_grade
 *       properties:
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계입니다.
 *         current_grade_arrive_date:
 *           type: number
 *           description: 현재 성장단계에 작물이 도달한 시간입니다.
 *         last_grade_arrive_date:
 *           type: number
 *           description: 작물이 마지막 단계에 도달한 시간입니다.
 *         plant_id:
 *           type: number
 *           description: 작물 성장 로그의 대상이 되는 작물의 고유 id입니다.
 *       example:
 *         current_grade: 2
 *         current_grade_arrive_date: 2023-05-03 20:24:43
 *         last_grade_arrive_date: 2023-05-04 20:24:43
 *         plant_id: 3
 */
module.exports = knex.schema.hasTable("plant_grade_logs").then( (exits) => {
  if(!exits) {
    return knex.schema.createTable("plant_grade_logs", (table) => {
       table.integer("plant_id").unsigned();
       table.enu("current_grade", ["1", "2", "3", "4"]).notNullable();
       table.dateTime("current_grade_arrive_date");
       table.dateTime("last_grade_arrive_date");
       table.foreign("plant_id").references("plants.id");
    });
  }
})