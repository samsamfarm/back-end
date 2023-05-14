const express = require("express");
const { CreatePlantRequestDTO } = require("../../dtos/plantDto");
const PlantService = require("../../services/plantService"); 
const UserService = require("../../services/userService");

const plantService = new PlantService();
const userService = new UserService();

const router = express.Router();

/**
 * @swagger
 * /api/v1/plant:
 *   get:
 *     summary: 모든 작물 목록 조회(이 부분은 postman에서 검사해주세요 스웨거에서는 안되는데 이유를 못 찾음)
 *     tags: [plant]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: 전체 작물 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       device_id:
 *                         type: number
 *                       plant_type:
 *                         type: number
 *                       current_grade:
 *                         type: string
 *                       plant_grade_update_time:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                       deleted_at:
 *                         type: string
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/", async (req, res, next) => {
  try {
    const allPlants = await plantService.getAllPlant();
    res.json({ data: allPlants });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/device:
 *   post:
 *     summary: 작물 생성(이 부분은 postman에서 검사해주세요 스웨거에서는 안되는데 이유를 못 찾음)
 *     tags: [plant]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                type: number
 *               device_id:
 *                type: number
 *               plant_type:
 *                type: string  
 *     responses:
 *       200:
 *         description: 작물 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: ok
 *       400:
 *         description: BAD_REQUEST.
 */
router.post("/", async (req, res, next) => {
  try {
    const { data } = new CreatePlantRequestDTO(req.body);
    console.log(data);
  const np = await plantService.createPlant(data);
    console.log(np);
    res.json({ data: "ok" });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/plant/:user_id:
 *   get:
 *     summary: 유저의 작물조회(이 부분은 postman에서 검사해주세요 스웨거에서는 안되는데 이유를 못 찾음)
 *     tags: [plant]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: number
 *         required: true
 *         description: 유저 ID  
 *     responses:
 *       200:
 *         description: 유저의 작물조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       device_id:
 *                         type: number
 *                       plant_type:
 *                         type: number
 *                       current_grade:
 *                         type: string
 *                       plant_grade_update_time:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                       deleted_at:
 *                         type: string
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/:user_id", async (req, res, next) => {
    try {
      const userId = req.params.user_id;

      await userService.validateUserByUserId(userId);

      const plants = await plantService.getPlantByUserId(userId);

      res.json({ data: plants });
    } catch (err) {
      next(err);
    }
});


module.exports = router;

