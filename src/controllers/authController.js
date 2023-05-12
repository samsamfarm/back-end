const express = require('express');
const UserService = require('../services/userService');
const { CreateUserRequestDTO, UserDTO, LoginUserRequestDTO, LoginUserResponseDTO } = require('../dtos/userDto');


const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: 유저 회원가입
 *     tags: [auth]
 *     requestBody:
 *       $ref: '#/components/dtos/CreateUserRequestDTO/requestBody'
 *     responses:
 *       200:
 *         description: 회원가입 완료.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/dtos/UserDTO'
 *       400:
 *         description: Invalid Sign-up.
 *       500:
 *         description: Server Error.
 *
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
 *       $ref: '#/components/dtos/LoginUserRequestDTO/requestBody'
 *     responses:
 *       200:
 *         description: 로그인 성공.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/dtos/LoginUserResponseDTO'
 *       400:
 *         description: Invalid Sign-in.
 *       500:
 *         description: Server Error.
 *
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
