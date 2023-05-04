// TODO: 작물(Plant)
// TODO: 방명록
// TODO: 작물 성장 단계 로그
// TODO: 작물 수집 로그

/**
 * @swagger
 * components:
 *   schemas:
 *     plants:
 *       type: object
 *       required:
 *         - current_grade
 *         - plant_type
 *       properties:
 *         id:
 *           type: number
 *           description: 작물 고유 id입니다.
 *         device_id:
 *           type: number
 *           description: 작물에 배정된 디바이스 고유_id 입니다.
 *         user_id:
 *           type: number
 *           description: 작물에 배정된 유저 고유_id 입니다.
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 *         plant_type:
 *           type: number
 *           description: 작물의 종류 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 작물이 생성된 날짜 입니다.
 *         plant_grade_update_time:
 *           type: string
 *           format: date
 *           description: 작물 성장단계가 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 작물이 삭제된 날짜 입니다.
 *       example:
 *         id: 4
 *         device_id: 1
 *         user_id: 2
 *         current_grade: 3
 *         plant_type: "rose"
 *         created_at: 2023-05-03 20:24:43
 *         plant_grade_update_time: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     plant_grade_logs:
 *       type: object
 *       required:
 *         - current_grade
 *       properties:
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계입니다.
 *         current_grade_arrive_date:
 *           type: number
 *           description: 현재 성장단계에 작물이 도달한 시간입니다.
 *         last_grade_arrive_date:
 *           type: number
 *           description: 작물이 마지막 단계에 도달한 시간입니다.
 *         plant_id:
 *           type: number
 *           description: 작물 성장 로그의 대상이 되는 작물의 고유 id입니다.
 *       example:
 *         current_grade: 2
 *         current_grade_arrive_date: 2023-05-03 20:24:43
 *         last_grade_arrive_date: 2023-05-04 20:24:43
 *         plant_id: 3
 */
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
  return router;
};
