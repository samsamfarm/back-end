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
 *         is_success:
 *           type: boolean
 *           description: 엑츄에이터 제어 성공 여부 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 한번의 엑츄에이터 제어가 실행된 시간입니다.
 *         finished_time:
 *           type: string
 *           format: date
 *           description: 한번의 엑츄에이터 제어 명령이 끝난 시점입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 엑츄에이터 제어 정보가 삭제된 날짜입니다.
 *       example:
 *         id: 4
 *         device_id: 5
 *         is_success: true
 *         createdAt: 2023-05-03 20:24:43
 *         finished_time: 2023-05-03 20:26:43
 *         deleted_at:  2023-05-05 20:24:43
 */
exports.up = function(knex) {
    return knex.schema.createTable("actuators", (table) => {
        table.increments("id").primary();
        table.integer("device_id").unsigned();
        table.boolean("is_success");
        table.enu("action_mode", ["led", "water", "hight"]).notNullable();
        table.boolean("action_status").notNullable();
        table.dateTime("created_at").defaultTo(knex.fn.now());
        table.dateTime("finished_time");
        table.dateTime("deleted_at");
        table.foreign("device_id").references("devices.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("actuators");
};
