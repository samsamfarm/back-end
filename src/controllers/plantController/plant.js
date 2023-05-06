const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  /**
   * @swagger
   * /api/plant:
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
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/grade:
   *   get:
   *     summary: 모든 유저의 작물 성장 단계 조회
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
  router.get("/grade", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/grade/:user-id:
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
  router.get("/grade/:user-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  router.use("/guest-book", require("./guestBook")(this.connection));
  return router;
};
