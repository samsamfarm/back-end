/**
 * @swagger
 * components:
 *   schemas:
 *     articles:
 *       type: object
 *       required:
 *         - user_id
 *         - article_id
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 댓글 고유id 입니다.
 *         user_id:
 *           type: number
 *           description: 댓글 올린 유저id 입니다.
 *         article_id:
 *           type: boolean
 *           description: 댓글이 올라간 게시물id 입니다.
 *         content:
 *           type: boolean
 *           description: 댓글 내용 입니다.
 *         created_at:
 *           type: boolean
 *           description: 댓글이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 댓글이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 댓글이 삭제된 날짜 입니다.
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.integer("article_id").unsigned();
    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .datetime("updated_at")
      .defaultTo(Database.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.datetime("deleted_at");
    table.foreign("user_id").references("users.id");
    table.foreign("article_id").references("articles.id");

  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
