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
   *       404:
   *         $ref: '#/components/responses/NotFound'
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
   *       404:
   *         $ref: '#/components/responses/NotFound'
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
