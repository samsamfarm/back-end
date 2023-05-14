// 유저 정보 (/user)

const express = require("express");

const UserService = require("../services/userService");
const {
  UserDTO,
  UpdateUserRequestDTO,
  DeleteUserRequestDTO,
} = require("../dtos/userDto");

const userService = new UserService();
const router = express.Router();

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: 내 정보 조회(내꺼)
 *     tags: [user]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "example@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     nickname:
 *                       type: string
 *                       example: "johndoe"
 *                     mbti:
 *                       type: string
 *                       example: "INTJ"
 *                     phone:
 *                       type: string
 *                       example: "123-456-7890"
 *                     created_at:
 *                       type: string
 *                       example: "2023-05-14T12:34:56Z"
 *                     updated_at:
 *                       type: string
 *                       example: "2023-05-14T13:45:00Z"
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/", async (req, res, next) => {
  try {
    const userId = req.user.id;

    await userService.validateUserByUserId(userId);

    const userInfo = await userService.findUserByUserId(userId);

    const user = new UserDTO(userInfo);

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/user/:id:
 *   get:
 *     summary: 유저 정보 조회 (다른 사람 꺼) (이 부분은 postman에서 검사해주세요 스웨거에서는 안되는데 이유를 못 찾음)
 *     tags: [user]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID
 *         example: 12  
 *     responses:
 *       200:
 *         description: 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "example@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     nickname:
 *                       type: string
 *                       example: "johndoe"
 *                     mbti:
 *                       type: string
 *                       example: "INTJ"
 *                     phone:
 *                       type: string
 *                       example: "123-456-7890"
 *                     created_at:
 *                       type: string
 *                       example: "2023-05-14T12:34:56Z"
 *                     updated_at:
 *                       type: string
 *                       example: "2023-05-14T13:45:00Z"
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    await userService.validateUserByUserId(userId);

    const userInfo = await userService.findUserByUserId(userId);

    const user = new UserDTO(userInfo);

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/user/control:
 *   put:
 *     summary: 유저 정보 수정 (내 정보)
 *     tags: [user]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                type: string
 *                example: "newpassword"
 *               phone:
 *                type: string
 *                example: "123-456-7890"
 *               name:
 *                type: string
 *                example: "John Doe"
 *               nickname:
 *                type: string
 *                example: "johndoe"
 *     responses:
 *       200:
 *         description: 수정 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "example@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     nickname:
 *                       type: string
 *                       example: "johndoe"
 *                     mbti:
 *                       type: string
 *                       example: "INTJ"
 *                     phone:
 *                       type: string
 *                       example: "123-456-7890"
 *                     created_at:
 *                       type: string
 *                       example: "2023-05-14T12:34:56Z"
 *                     updated_at:
 *                       type: string
 *                       example: "2023-05-14T13:45:00Z"
 *       400:
 *         description: BAD_REQUEST.
 */

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const requestParam = {
      id: req.params?.id,
      body: req.body,
    };

    const user = new UpdateUserRequestDTO(userId, requestParam);

    const userInfo = await userService.updateUser(user);

    const result = new UserDTO(userInfo);

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/user/:id:
 *   delete:
 *     summary: 유저 정보 삭제 (내것만 삭제)
 *     tags: [user]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID 
 *         example: 12 
 *     responses:
 *       204:
 *         description: 성공.
 *         content:
 *           application/json:
 *       400:
 *         description: BAD_REQUEST.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { id } = new DeleteUserRequestDTO(userId, req.params);

    userService.deleteUser(id);

    // NOTE: https://velog.io/@server30sopt/204-NOCONTENT에-대해-아시나요
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;