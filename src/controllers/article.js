// POST: article
// DELETE: article
// FETCH: article
// GET: article

// 댓글 추가하기
// 댓글 삭제하기
// 댓글 수정하기
const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  // 게시물 작성
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
  router.get("/show-article", (req, res) => {
    res.json({ data: "ok" });
  });
  //유저의 게시물 불러오기 + 댓글
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
