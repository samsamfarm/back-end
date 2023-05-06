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
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     user_name:
 *       type: object
 *       required:
 *         - name
 *         - nickname
 *       properties:
 *         id:
 *           type: number
 *           description: 유저 고유id입니다.
 *         name:
 *           type: string
 *           description: 유저의 이름입니다.
 *         nickname:
 *           type: string
 *           description: 유저의 닉네임입니다.
 */
