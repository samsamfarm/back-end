const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  /**
   * @swagger
   * /api/v1/plant/guest-book:
   *   post:
   *     summary: 새로운 방명록 작성
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     parameters:
   *       - name: writer
   *         in: query
   *         required: true
   *         description: 방명록 작성자
   *         schema:
   *           type: string
   *       - name: content
   *         in: query
   *         required: true
   *         description: 방명록 내용
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 방명록 생성 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
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
   * /api/v1/plant/guest-book:
   *   get:
   *     summary: 방명록 불러오기
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     responses:
   *       200:
   *         description: 방명록 조회 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.get("/", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/v1/plant/guest-book:
   *   patch:
   *     summary: 방명록 수정
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     parameters:
   *       - name: writer
   *         in: query
   *         required: true
   *         description: 방명록 작성자
   *         schema:
   *           type: string
   *       - name: content
   *         in: query
   *         required: true
   *         description: 방명록 내용
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 방명록 수정 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.patch("/", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/v1/plant/guest-book:
   *   delete:
   *     summary: 방명록 불러오기
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     responses:
   *       200:
   *         description: 방명록 삭제 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.delete("/", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  return router;
};
