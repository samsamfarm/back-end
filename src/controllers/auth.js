// 유저 (/auth)
// TODO: sign-in / sign-out
// MBTI 추가 / 수정
const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  // 회원가입
  router.post("/sign-up", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 로그인
  router.post("/sign-in", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });
};
