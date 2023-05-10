/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("comments", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned();
        table.integer("article_id").unsigned();
        table.text("content", 255).notNullable();
        table.foreign("user_id").references("users.id");
        table.foreign("article_id").references("articles.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
