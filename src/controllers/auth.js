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
