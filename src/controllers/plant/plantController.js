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
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: 페이지당 아이템 수  
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
 *                         example: 1
 *                       user_id:
 *                         type: number
 *                         example: 123
 *                       device_id:
 *                         type: number
 *                         example: 456
 *                       plant_type:
 *                         type: number
 *                         example: 2
 *                       current_grade:
 *                         type: string
 *                         example: "1"
 *                       plant_grade_update_time:
 *                         type: string
 *                         example: "2023-05-14T12:34:56Z"
 *                       created_at:
 *                         type: string
 *                         example: "2023-05-14T12:34:56Z"
 *                       deleted_at:
 *                         type: string
 *                         example: null
 *       400:
 *         description: BAD_REQUEST.
 */

router.get("/", async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const allPlants = await plantService.getAllPlant(page, perPage);

    res.json({ data: allPlants });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/plant:
 *   post:
 *     summary: 작물 생성
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
 *                example: 123
 *               device_id:
 *                type: number
 *                example: 456
 *               plant_type:
 *                type: string  
 *                example: "Aloe Vera"
 *     responses:
 *       200:
 *         description: 작물 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: ok
 *       400:
 *         description: BAD_REQUEST.
 */
router.post("/", async (req, res, next) => {
  try {
    const { data } = new CreatePlantRequestDTO(req.body);
   
    await plantService.createPlant(data);
    const plantId = await plantService.returnPlantId();
    
    await plantService.createPlantGradeLog(plantId);
    
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
 *         example: 12
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
 *                         example: 1
 *                       user_id:
 *                         type: number
 *                         example: 12
 *                       device_id:
 *                         type: number
 *                         example: 456
 *                       plant_type:
 *                         type: string
 *                         example: "Aloe Vera"
 *                       current_grade:
 *                         type: string
 *                         example: "1"
 *                       plant_grade_update_time:
 *                         type: string
 *                         example: "2023-05-14T12:34:56Z"
 *                       nickname:
 *                         type: string
 *                         example: "핸섬호성"
 *                       mbti:
 *                         type: string
 *                         example: "CUTE"  
 *                       created_at:
 *                         type: string
 *                         example: "2023-05-14T12:34:56Z"
 *                       deleted_at:
 *                         type: string
 *                         example: null
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

