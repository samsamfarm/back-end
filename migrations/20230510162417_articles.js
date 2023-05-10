exports.up = function(knex) {
    return knex.schema.createTable("articles", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned();
        table.text("content", 255).notNullable();
        table.integer("view_count").unsigned();        
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.datetime("updated_at");
        table.datetime("deleted_at");
        table.foreign("user_id").references("users.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
