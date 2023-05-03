// TODO: 작물(Plant)
// TODO: 방명록
// TODO: 작물 성장 단계 로그
// TODO: 작물 수집 로그

const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  // 작물 생성
  router.post("/make-plant", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  // 현재 작물의 성장 단계 조회
  router.get("/render-plant-grade/:user-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  //작물 정보 업데이트(성장단계)
  router.patch("/update-plant", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 작물의 성장단계 로그 생성 (측정시작)
  router.post("/create-plant-grade-log", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 특정 시간이 지나면 작물의 성장단계 업데이트
  router.patch("/update-plant-grade-log", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  //새로운 방명록 작성
  router.post("/guest-book/new-doodle", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 방명록 조회
  router.get("/guest-book/read-doodle", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 방명록 수정
  router.patch("/guest-book/modify-doodle", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 방명록 삭제
  router.delete("/guest-book/delete-doodle", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
};
