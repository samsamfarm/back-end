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
 *               name:
 *                 type: string
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *               password_confirm:
 *                 type: string
 *               phone:
 *                 type: string
 *               mbti:
 *                 type: string
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
 *                 name:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 mbti:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
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
 *               password:
 *                 type: string
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
 *                 name:
 *                   type: string
 *                 accessToken:
 *                   type: string
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
