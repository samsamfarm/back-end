const express = require("express");
const { CreateGuestBookDto } = require("../../dtos/guestBookDto")
const GuestBookService = require("../../services/guestBookService")

const router = express.Router();
const guestBookService = new GuestBookService();
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
      const { user_id, writer, content } = req.body; 
      const guestBook = new CreateGuestBookDto({ user_id, writer, content });

      await guestBookService.createGuestBook(guestBook);

      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/v1/plant/guest-book:
   *   get:
   *     summary: 방명록 불러오기(미구현)
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
  router.get("/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const getGuestBook = await guestBookService.getGuestBook(userId);
     
      res.send({ data: getGuestBook });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/v1/plant/guest-book:
   *   patch:
   *     summary: 방명록 수정(미구현)
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
   *     summary: 방명록 불러오기(미구현)
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

  module.exports = router;

