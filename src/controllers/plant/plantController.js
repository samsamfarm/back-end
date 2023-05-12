const express = require("express");
const knex = require("../../config/knexClient");
const { CreatePlantRequestDTO } = require("../../dtos/plantDto");
const PlantService = require("../../services/plantService"); 
const UserService = require("../../services/userService");

const plantService = new PlantService();
const userService = new UserService();

const router = express.Router();

/**
 * @swagger
 * /api/v1/plant:
 *   post:
 *     summary: 새로운 작물 생성(배정)
 *     tags: [plant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/plants'
 *     parameters:
 *       - name: plant_type
 *         in: query
 *         required: true
 *         description: 작물 품종 이름
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 작물 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/plants'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post("/", async (req, res, next) => {
  try {
    const { data } = new CreatePlantRequestDTO(req.body);

    await plantService.createPlant(data);

    res.json({ data: "ok" });
  } catch (err) {
    next(err);
  }
});

  /**
 * @swagger
 * /api/v1/plant/:user_id:
 *   get:
 *     summary: 특정 유저의 작물 성장 단계 조회
 *     tags: [plant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/plant_grade_with_user'
 *     parameters:
 *       - name: user-id
 *         in: query
 *         required: true
 *         description: 유저의 고유 id
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/plant_grade_with_user'
 *       404:
 *         $ref: '#/components/responses/NotFound'
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

/**
 * @swagger
 * /api/v1/plant/:
 *   get:
 *     summary: 전체 유저의 작물 조회
 *     tags: [plant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/plant_grade_with_user'
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/plant_grade_with_user'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/", async (req, res, next) => {
   try {
    const allPlants = await plantService.getAllPlant();
      res.json({ data: allPlants });
   } catch (err) {
       next(err);
   }
  });

module.exports = router;

