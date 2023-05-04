// 유저 (/auth)
// TODO: sign-in / sign-out
// MBTI 추가 / 수정
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
 *           type: number
 *           description: 유저의 이메일입니다.
 *         name:
 *           type: number
 *           description: 유저의 이름입니다.
 *         nickname:
 *           type: number
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
/**
 * @swagger
 * components:
 *   schemas:
 *     guest_books:
 *       type: object
 *       required:
 *         - writer
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 방명록 고유 id입니다.
 *         plant_id:
 *           type: number
 *           description: 방명록이 남겨져있는 객체의 작물_id 입니다 .
 *         user_id:
 *           type: number
 *           description: 방명록이 남겨져있는 객체의 유저_id 입니다.
 *         home_user_id:
 *           type: string
 *           description: 하나의 방명록 위에 존재하는 상위 방명록의 유저_id입니다.
 *         content:
 *           type: string
 *           description: 방명록 id입니다.
 *         writer:
 *           type: string
 *           description: 방명록 작성자입니다
 *         is_edited:
 *           type: boolean
 *           description: 방명록이 수정여부를 나타냅니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 방명록이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 방명록이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 방명록이 삭제된 날짜 입니다.
 *       example:
 *         id: 4
 *         plant_id: 5
 *         user_id: 3
 *         home_user_id: 2
 *         contents: ENFP
 *         writer: 01012343214
 *         is_edited: false
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */
const express = require("express");

module.exports = (connection) => {
  const router = express.Router();

  /**
   * @swagger
   
   * /api/auth/sign-up:
   *   post:
   *     summary: 유저 회원가입
   *     tags: [auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/users'
   *     parameters:
   *       - name: email
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 이메일
   *         schema:
   *           type: string  
   *       - name: name
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 이름
   *         schema:
   *           type: string
   *       - name: nickname
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 닉네임
   *         schema:
   *           type: string
   *       - name: pasword
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 비밀번호
   *         schema:
   *           type: string
   *       - name: mbti
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 mbti
   *         schema:
   *           type: string
   *           enum: ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ']
   *       - name: phone
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 전화번호
   *         schema:
   *           type: string      
   *     responses:
   *       200:
   *         description: 회원가입 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/users'
   *       400:
   *         description: Invalid Sign-up.
   *       500:
   *         description: Server Error.
   *
   */

  router.post("/sign-up", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 로그인
  /**
   * @swagger
   
   * /api/auth/sign-in:
   *   post:
   *     summary: 유저 로그인
   *     tags: [auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/users'
   *     parameters:
   *       - name: email
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 이메일
   *         schema:
   *           type: string  
   *       - name: pasword
   *         in: query
   *         required: true
   *         description: 유저 DB에 저장할 비밀번호
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 회원가입 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/users'
   *       400:
   *         description: Invalid Sign-in.
   *       500:
   *         description: Server Error.
   *
   */
  router.post("/sign-in", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });
  return router;
};
