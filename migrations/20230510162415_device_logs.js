/**
 * @swagger
 * components:
 *   schemas:
 *     device_logs:
 *       type: object
 *       required:
 *         - temperature
 *         - humid
 *         - moisture
 *         - bright
 *       properties:
 *         plant_id:
 *           type: int
 *           description: 해당 측정 로그를 발생시키는 디바이스의 고유id 입니다.
 *         temperature:
 *           type: number
 *           description: 온도 측정 로그 입니다.
 *         humid:
 *           type: number
 *           description: 습도 측정 로그 입니다.
 *         moisture:
 *           type: string
 *           format: date
 *           description: 토양수분 측정 로그 입니다.
 *         bright:
 *           type: string
 *           format: date
 *           description: 조도 측정 로그 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 한번의 디바이스 로그가 측정된 시간 입니다.
 *       example:
 *         plant_id: 4
 *         temperature: 35.5
 *         humid: 59.2
 *         moisture: 78.3
 *         bright: 1200
 *         created_at:  2023-05-05 20:24:43
 */
exports.up = function(knex) {
    return knex.schema.createTable("device_logs", (table) => {
        table.increments("id").primary();
        table.decimal("temperature", 5, 1);
        table.decimal("humid", 5, 1);
        table.bigInteger("bright");
        table.decimal("moisture", 5, 1);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.integer("device_id");
        table.foreign("device_id").references("devices.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("device_logs");
};
