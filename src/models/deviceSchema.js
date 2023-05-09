const knex = require("./dbConnection");

/**
 * @swagger
 * components:
 *   schemas:
 *     devices:
 *       type: object
 *       required:
 *         - device_order
 *       properties:
 *         id:
 *           type: number
 *           description: 디바이스 고유id 입니다.
 *         device_order:
 *           type: string
 *           description: 디바이스의 식별 번호 입니다.
 *         user_id:
 *           type: number
 *           description: 해당 디바이스가 배정되어 있는 유저의 고유id 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 디바이스 생성날짜입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 디바이스 정보 업데이트 날짜입니다 .
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 디바이스 정보 삭제된 날짜입니다.
 *       example:
 *         id: 4
 *         device_order: a7
 *         user_id: 3
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */

module.exports = knex.schema.hasTable("devices").then( (exists) => {
  if(!exists) {
    return knex.schema.createTable("devices", (table) => {
       table.increments("id").primary();
       table.integer("user_id").unsigned();
       table.string("device_order", 2).notNullable();
       table.timestamp("created_at").defaultTo(knex.fn.now());
       table.datetime("updated_at");
       table.datetime("deleted_at");
       table.foreign("user_id").references("users.id");
    });
  }
});