/**
 * @swagger
 * components:
 *   schemas:
 *     articles:
 *       type: object
 *       required:
 *         - user_id
 *         - content
 *         - device_id  
 *       properties:
 *         id:
 *           type: number
 *           description: 게시물 고유id 입니다.
 *         user_id:
 *           type: number
 *           description: 게시물 올린 유저id 입니다.
 *         content:
 *           type: boolean
 *           description: 게시물 내용 입니다.
 *         view_count:
 *           type: boolean
 *           description: 게시물 조회수 입니다.
 *         created_at:
 *           type: boolean
 *           description: 게시물이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 게시물이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 게시물이 삭제된 날짜 입니다.
 */
exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.text("content", 255).notNullable();
    table.integer("view_count").unsigned().defaultTo(1);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .datetime("updated_at")
      .defaultTo(Database.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.datetime("deleted_at");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
