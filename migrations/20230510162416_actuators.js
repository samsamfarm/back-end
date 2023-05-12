/**
 * @swagger
 * components:
 *   schemas:
 *     actuators:
 *       type: object
 *       required:
 *         - is_success
 *       properties:
 *         id:
 *           type: number
 *           description: 엑츄에이터 고유id 입니다.
 *         device_id:
 *           type: number
 *           description: 해당 엑츄에이터 제어를 실행시키는 디바이스의 고유id 입니다.
 *         wind_command:
 *           type: enum
 *           description: 엑츄에이터 제어 성공 여부 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 한번의 엑츄에이터 제어가 실행된 시간입니다.
 */
exports.up = function(knex) {
    return knex.schema.createTable("actuators", (table) => {
        table.increments("id").primary();
        table.integer("device_id");
        table.boolean("wind_command").defaultTo(false)
        table.boolean("water_command").defaultTo(false)
        table.boolean("light_command").defaultTo(false)
        table.dateTime("created_at").defaultTo(knex.fn.now());
        table.foreign("device_id").references("devices.id");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("actuators");
};
