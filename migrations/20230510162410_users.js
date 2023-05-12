// Reference : https://knexjs.org/guide/schema-builder.html

/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - nickname
 *         - password
 *         - mbti
 *         - phone
 *       properties:
 *         id:
 *           type: number
 *           description: 유저 고유id입니다.
 *         email:
 *           type: string
 *           description: 유저의 이메일입니다.
 *         name:
 *           type: string
 *           description: 유저의 이름입니다.
 *         nickname:
 *           type: string
 *           description: 유저의 닉네임입니다.
 *         password:
 *           type: string
 *           description: 유저의 비밀번호입니다.
 *         mbti:
 *           type: string
 *           enum: ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ']
 *           description: mbti 16종류입니다.
 *         phone:
 *           type: string
 *           description: 유저의 전화번호입니다
 *         created_at:
 *           type: string
 *           format: date
 *           description: 유저 생성날짜입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 유저 정보 업데이트 날짜입니다 .
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 유저 정보가 삭제된 날짜입니다.
 *       example:
 *         id: 4
 *         email: 5
 *         name: 온호성
 *         nickname: 핸섬호성
 *         password: thisispassword
 *         mbti: ENFP
 *         phone: 01012343214
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email", 20).notNullable();
        table.string("name", 20).notNullable();
        table.string("nickname", 20).notNullable();
        table.string("password", 60).notNullable(); // 60 is bcrypt encoded password length
        table.string("mbti", 4).notNullable();
        table.string("phone", 15).notNullable();
        table.datetime("created_at").defaultTo(knex.fn.now());
        table.datetime("updated_at");
        table.datetime("deleted_at");
        table.unique("email");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users")
};
  
exports.config = { transaction: false }