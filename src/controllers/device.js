const express = require("express");
module.exports = (connection) => {
  const router = express.Router();

  /**
   * @swagger
   * /api/device:
   *   post:
   *     summary: 새로운 디바이스 생성(새로운 회원에게 배정)
   *     tags: [device]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/devices'
   *     parameters:
   *       - name: device_order
   *         in: query
   *         required: true
   *         description: 디바이스 목록조회를 위한 디바이스의 번호
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 디바이스 생성 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/devices'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */

  router.post("/", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/device:
   *   get:
   *     summary: 전체 디바이스 정보 조회
   *     tags: [device]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/devices'
   *     responses:
   *       200:
   *         description: 디바이스 생성 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/devices'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.get("/", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });
  /**
   * @swagger
   * /api/:device-id:
   *   get:
   *     summary: 특정 디바이스 조회
   *     tags: [device]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/devices'
   *     parameters:
   *       - name: device_order
   *         in: query
   *         required: true
   *         description: 디바이스 목록조회를 위한 디바이스의 번호
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 특정 디바이스 조회 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/devices'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.get("/:device-id", async (req, res, next) => {
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
  return router;
};
