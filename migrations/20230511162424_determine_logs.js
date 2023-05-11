exports.up = function (knex) {
  return knex.schema.createTable("determine_logs", (table) => {
    table.integer("device_log_id").unsigned();
    table.enu("temperature_state", ["red", "green"]);
    table.enu("humid_state", ["red", "green"]);
    table.enu("bright_state", ["red", "green"]);
    table.enu("moisture_state", ["red", "green"]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("device_log_id").references("device_logs.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("determine_logs");
};
