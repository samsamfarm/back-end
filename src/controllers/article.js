/**
 * @swagger
 * components:
 *   schemas:
 *     articles:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 게시글 고유 id입니다.
 *         title:
 *           type: string
 *           description: 게시글 제목 입니다.
 *         content:
 *           type: string
 *           description: 게시글 본문 내용 입니다.
 *         view_count:
 *           type: number
 *           description: 게시글의 조회수 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 게시글이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 게시글이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 게시글이 삭제된 날짜 입니다.
 *       example:
 *         id: 4
 *         title: 게시물 제목
 *         content: 게시물 내용
 *         view_count: 203
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     comments:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 댓글 고유 id입니다.
 *         user_id:
 *           type: number
 *           description: 댓글을 코멘트한 유저의 id입니다.
 *         article_id:
 *           type: number
 *           description: 댓글이 적혀있는 게시물의 id입니다.
 *         content:
 *           type: string
 *           description: 댓글 내용 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 댓글이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 댓글이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 댓글이 삭제된 날짜 입니다.
 *       example:
 *         id: 4
 *         article_id: 5
 *         user_id: 3
 *         content: 댓글 내용
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */

const express = require("express");

module.exports = (connection) => {
  const router = express.Router();

  /**
   * @swagger
   
   * /api/article/new-article:
   *   post:
   *     summary: 새로운 게시물 작성
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     responses:
   *       200:
   *         description: 새로운 개시물 작성 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       400:
   *         description: Invalid Article.
   *
   */

  router.post("/new-article", async (rep, res, next) => {
    try {
      const { title, content } = req.body;
      const result = await connection.query(
        `INSERT INTO posts (title, content) VALUES (?, ?)`,
        [title, content]
      );
      console.log(result);

      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  //커뮤니티 화면 - 게시물 불러오기

  /**
   * @swagger
   
   * /api/article/show-article:
   *   get:
   *     summary: 전체 게시물을 불러오는 api 입니다
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     responses:
   *       200:
   *         description: 게시물 조회 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       500:
   *         description: 서버 에러 입니다.
   *
   */

  router.get("/show-article", (req, res) => {
    res.json({ data: "ok" });
  });

  //유저의 게시물 불러오기 + 댓글
  /**
   * @swagger
   
   * /api/article/show-article/:user-id:
   *   get:
   *     summary: 유저의 게시물과 댓글을 불러오는 api 입니다
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     responses:
   *       200:
   *         description: 게시물 조회 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       500:
   *         description: 서버 에러 입니다.
   *
   */
  router.get("/show-article/:user-id", (req, res) => {
    res.json({ data: "ok" });
  });

  // 게시물 수정

  router.patch("/modify-article", (req, res) => {
    res.json({ data: "ok" });
  });
  // 게시물 삭제
  router.delete("/delete-article", (req, res) => {
    res.json({ date: "ok" });
  });

  // 댓글 생성
  router.post("/create-comment", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 댓글 수정
  router.patch("/modify-comment", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  // 댓글 삭제
  router.delete("/delete-comment", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
