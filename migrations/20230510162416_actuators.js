/**
 * @swagger
 * components:
 *   schemas:
 *     actuators:
 *       type: object
 *       required:
 *         - device_id
 *       properties:
 *         id:
 *           type: number
 *           description: 엑츄에이터 고유id 입니다.
 *         device_id:
 *           type: number
 *           description: 해당 엑츄에이터 제어가 실행되는 디바이스의 고유id 입니다.
 *         wind_command:
 *           type: boolean
 *           description: 바람 공급 가동여부에 대한 데이터 입니다.
 *         water_command:
 *           type: boolean
 *           description: 물 공급 가동여부에 대한 데이터 입니다.
 *         light_command:
 *           type: boolean
 *           description: led 제어 가동여부에 대한 데이터 입니다
 *         created_at:
 *           type: string
 *           format: date
 *           description: 디바이스에 엑츄에이터 제어가 최초 설정된 시간입니다.
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
