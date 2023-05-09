const knex = require("./dbConnection");

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

module.exports = knex.schema.hasTable("guest_books").then((exits) => {
  if (!exits) {
    return knex.creatTable("guest_books", (table) => {
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