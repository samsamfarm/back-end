
plants
plant_grade_logs
guest_books
const knex = require("knex");

/**
 * @swagger
 * components:
 *   schemas:
 *     plants:
 *       type: object
 *       required:
 *         - current_grade
 *         - plant_type
 *       properties:
 *         id:
 *           type: number
 *           description: 작물 고유 id입니다.
 *         device_id:
 *           type: string
 *           description: 작물에 배정된 디바이스 고유_id 입니다.
 *         user_id:
 *           type: number
 *           description: 작물에 배정된 유저 고유_id 입니다.
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 *         plant_type:
 *           type: string
 *           description: 작물의 종류 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 작물이 생성된 날짜 입니다.
 *         plant_grade_update_time:
 *           type: string
 *           format: date
 *           description: 작물 성장단계가 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 작물이 삭제된 날짜 입니다.
 */
const plantSchema = knex.schema.hasTable("plants").then((exists) => {
  if (!exists) {
    return createTable("plants", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("device_id").unsigned().references("id").inTable("devices");
      table.string("plant_type", 20);
      table.enum("current_grade", ["1", "2", "3", "4"]).defaultTo("1");
      table.datetime("plant_grade_update_time");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.datetime("deleted_at").nullable();
    });
  }
});

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
const plantGradeLogSchema = knex.schema
  .hasTable("plant_grade_logs")
  .then((exits) => {
    if (!exits) {
      return knex.schema.createTable("plant_grade_logs", (table) => {
        table.integer("plant_id").unsigned();
        table.enu("current_grade", ["1", "2", "3", "4"]).notNullable();
        table.dateTime("current_grade_arrive_date");
        table.dateTime("last_grade_arrive_date");
        table.foreign("plant_id").references("plants.id");
      });
    }
  });

/**
 * @swagger
 * components:
 *   schemas:
 *     guest_books:
 *       type: object
 *       required:
 *         - writer
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 방명록 고유 id입니다.
 *         plant_id:
 *           type: number
 *           description: 방명록이 남겨져있는 객체의 작물_id 입니다 .
 *         user_id:
 *           type: number
 *           description: 방명록이 남겨져있는 객체의 유저_id 입니다.
 *         content:
 *           type: string
 *           description: 방명록 id입니다.
 *         writer:
 *           type: string
 *           description: 방명록 작성자입니다
 *         is_edited:
 *           type: boolean
 *           description: 방명록이 수정여부를 나타냅니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 방명록이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 방명록이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 방명록이 삭제된 날짜 입니다.
 */
const guestBookSchema = knex.schema.hasTable("guest_books").then((exits) => {
  if (!exits) {
    return knex.createTable("guest_books", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned();
      table.integer("plant_id").unsigned();
      table.string("content", 255).notNullable();
      table.string("writer", 20).notNullable();
      table.boolean("is_edited").defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at");
      table.datetime("deleted_at");
      table.foreign("user_id").references("users.id");
      table.foreign("plant_id").references("plants.id");
    });
  }
});

module.exports = {
  plantSchema,
  plantGradeLogSchema,
  guestBookSchema,
};
