// TODO: 액츄레이터 제어
// TODO: 디바이스 CRUD (크루드)
const express = require("express");
module.exports = (connection) => {
  const router = express.Router();
  // 새로운 디바이스 생성
  router.post("/new-device", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  // 디바이스 정보 조회
  router.get("/about-device", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  // 디바이스 정보 업데이트
  router.patch("/update-device", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  // 디바이스 삭제
  router.delete("/delete-device", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  //액츄에이터 제어 - 새로운 신호 생성
  router.post("/new-actuator-control", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  //액츄에이터 제어 - 기록 조회
  router.get("/show-actuator-control", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });
  //액츄에이터 제어 - 기록 삭제
  router.delete("/show-actuator-control", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  //새로운 디바이스 수집 로그 생성 (5초 간격)
  router.post("/create-device-log", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  //디바이스 로그 조회
  router.get("/show-device-log", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  // 특정 디바이스 로그 삭제
  router.delete("/delete-device-log/:created_at", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
};
