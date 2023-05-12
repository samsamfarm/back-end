exports.up = function (knex) {
  return knex.schema.createTable("determine_logs", (table) => {
    table.increments("id").primary();
    table.integer("device_id");
    table.integer("safe_min_temperature");
    table.integer("safe_max_temperature");
    table.integer("safe_min_humid");
    table.integer("safe_max_humid");
    table.integer("safe_min_bright");
    table.integer("safe_max_bright");
    table.integer("safe_min_moisture");
    table.integer("safe_max_moisture");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("device_id").references("devices.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("determine_logs");
};
