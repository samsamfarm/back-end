const express = require('express');
const UserService = require('../services/userService');
const { CreateUserRequestDTO, UserDTO, LoginUserRequestDTO, LoginUserResponseDTO } = require('../dtos/userDto');

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: 유저 회원가입
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               nickname:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               password_confirm:
 *                 type: string
 *                 example: password123
 *               phone:
 *                 type: string
 *                 example: "010-1234-5678"
 *               mbti:
 *                 type: string
 *                 example: "INTJ"
 *     responses:
 *       200:
 *         description: 회원가입 완료.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 nickname:
 *                   type: string
 *                   example: johndoe
 *                 mbti:
 *                   type: string
 *                   example: "INTJ"
 *                 phone:
 *                   type: string
 *                   example: "+1 123-456-7890"
 *                 created_at:
 *                   type: string
 *                   example: "2023-05-14T12:34:56Z"
 *                 updated_at:
 *                   type: string
 *                   example: "2023-05-14T12:34:56Z"
 *       400:
 *         description: BAD_REQUEST.
 */
router.post('/sign-up', async (req, res, next) => {
  try {
    const user = new CreateUserRequestDTO(req.body);

    const userInfo = await userService.createUser(user);

    const result = new UserDTO(userInfo);

    res.json({data: result});
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: 유저 로그인
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: BAD_REQUEST.
 */
router.post('/sign-in', async (req, res, next) => {
  try {
    const user = new LoginUserRequestDTO(req.body);

    await userService.validateUserByEmail(user.email);
    await userService.validateUserByPasswordAndEmail(
      user.email,
      user.password
    );

    const loginUser = await userService.getLoginInfoByUser(user);

    const result = new LoginUserResponseDTO(loginUser);

    res.json({data: result});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
