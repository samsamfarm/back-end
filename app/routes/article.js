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

  router.get("/", (req, res) => {
    connection.query("");
  });

  return router;
};
