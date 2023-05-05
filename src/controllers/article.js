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
 *         user_id:
 *           type: number
 *           description: 게시글의 유저 id 입니다.
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
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     article_with_commets:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/articles'
 *           description: 게시물 입니다.
 *         comment:
 *           $ref: '#/components/schemas/commets'
 *           description: 댓글 입니다.
 */
const express = require("express");

module.exports = (connection) => {
  const router = express.Router();

  /**
   * @swagger
   
   * /api/article:
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

  router.post("/", async (rep, res, next) => {
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
   
   * /api/article:
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
   *       400:
   *         description: Invalid.
   */

  router.get("/", (req, res) => {
    res.json({ data: "ok" });
  });

  /**
   * @swagger
   * /api/article/:article-id:
   *   get:
   *     summary: 해당 게시물 id의 게시물과 댓글 불러오기
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/article_with_commets'
   *     parameters:
   *       - name: article-id
   *         in: query
   *         required: true
   *         description: 게시물의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/article_with_commets'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.get("/:article-id", (req, res) => {
    res.json({ data: "ok" });
  });
  /**
   * @swagger
   * /api/article/:article-id:
   *   patch:
   *     summary: 특정 게시물 수정
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     parameters:
   *       - name: article-id
   *         in: query
   *         required: true
   *         description: 게시물의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.patch("/:article-id", (req, res) => {
    res.json({ data: "ok" });
  });
  // 게시물 삭제
  /**
   * @swagger
   * /api/article/:article-id:
   *   delete:
   *     summary: 특정 게시물 삭제
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     parameters:
   *       - name: article-id
   *         in: query
   *         required: true
   *         description: 게시물의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.delete("/:article-id", (req, res) => {
    res.json({ date: "ok" });
  });

  // 댓글 생성
  /**
   * @swagger
   * /api/article/comment:
   *   post:
   *     summary: 새로운 댓글 작성
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/comments'
   *     responses:
   *       200:
   *         description: 새로운 댓글 작성 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/comments'
   *       400:
   *         description: Invalid Article.
   *
   */
  router.post("/comment", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 댓글 수정
  /**
   * @swagger
   * /api/article/comment/:comment-id:
   *   patch:
   *     summary: 특정 댓글 수정
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/comments'
   *     parameters:
   *       - name: comment-id
   *         in: query
   *         required: true
   *         description: 댓글의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/comments'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.patch("/comment/:comment-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  // 댓글 삭제
  /**
   * @swagger
   * /api/article/comment/:comment-id:
   *   delete:
   *     summary: 특정 댓글 수정
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/comments'
   *     parameters:
   *       - name: comment-id
   *         in: query
   *         required: true
   *         description: 댓글의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/comments'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.delete("/comment/:comment-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
