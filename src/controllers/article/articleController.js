const express = require("express");

const { CreateArticleDTO, ModifyArticleDTO } = require("../../dtos/articleDto");
const ArticeService = require("../../services/articleService");

const router = express.Router();
const articeService = new ArticeService();
  /**
   * @swagger
   * /api/v1/article:
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
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  //댓글과 조인
  router.get("/", (req, res, next) => {
    try {
      const allArticle = articeService.getAllArticle();
      res.json({ data: allArticle });
    } catch(err) {
      next(err)
    }
  });

  /**
   * @swagger
   * /api/v1/article:
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
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  //TODO: 게시글 생성하고, 
  router.post("/", async (req, res, next) => {
    try {
      const article = CreateArticleDTO(req.body);
      const newArticle = articeService.newArtcle(article);
      res.json({ data: newArticle });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/v1/article/:article-id:
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
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  // 게시물 하나씩
  router.get("/:article-id", (req, res, next) => {
    try {
      const {articleId} = req.body;
      const getArticleWithComment =
       articeService.getArticleWithComment(articleId);
      res.json({ data: getArticleWithComment });
    } catch(err) {
      next(err);
    }
    
  });
  /**
   * @swagger
   * /api/v1/article/:article-id:
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
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  //수정
  router.patch("/:article-id", (req, res, next) => {
    try {
      const { articleId } = req.params; 
      const { title, content } = req.body; 

      const modifyArticleDTO = new ModifyArticleDTO({ title, content });

      const modifyArticle = articeService.modifyArticle(articleId, modifyArticleDTO);

      res.json({ data: modifyArticle });
    } catch (err) {
      next(err);
    }
  });
  // 게시물 삭제
  /**
   * @swagger
   * /api/v1/article/:article-id:
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
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  //삭제
  router.delete("/:article-id", (req, res, next) => {
    try {
      const { articleId } = req.params;
      articeService.deleteArticle(articleId);
      res.status(204).end();
    } catch(err) {
      next(err);
    }
  });
// 댓글 추가
  router.post("/comment", (req, res, next) => {
    try {

    } catch(err) {
      next(err);
    }
  })
//댓글
  router.put("/comment");

  router.delete("/comment");

module.exports = router;