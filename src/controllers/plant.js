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
 *           type: string
 *           description: 작물에 배정된 디바이스 고유_id 입니다.
 *         user_id:
 *           type: number
 *           description: 작물에 배정된 유저 고유_id 입니다.
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 *         plant_type:
 *           type: string
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
/**
 * @swagger
 * components:
 *   schemas:
 *     guest_books:
 *       type: object
 *       required:
 *         - writer
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 방명록 고유 id입니다.
 *         plant_id:
 *           type: number
 *           description: 방명록이 남겨져있는 객체의 작물_id 입니다 .
 *         user_id:
 *           type: number
 *           description: 방명록이 남겨져있는 객체의 유저_id 입니다.
 *         content:
 *           type: string
 *           description: 방명록 id입니다.
 *         writer:
 *           type: string
 *           description: 방명록 작성자입니다
 *         is_edited:
 *           type: boolean
 *           description: 방명록이 수정여부를 나타냅니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 방명록이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 방명록이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 방명록이 삭제된 날짜 입니다.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     plant_grade_with_user:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/user_name'
 *           description: 유저 이름, 닉네임.
 *         plant:
 *           $ref: '#/components/schemas/plant_grade'
 *           description: 작물의 현재 성장단계.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     plant_grade:
 *       type: object
 *       required:
 *         - current_grade
 *       properties:
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 */

const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  /**
   * @swagger
   * /api/plant:
   *   post:
   *     summary: 새로운 작물 생성(배정)
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/plants'
   *     parameters:
   *       - name: plant_type
   *         in: query
   *         required: true
   *         description: 작물 품종 이름
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 작물 생성 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/plants'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.post("/", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/grade:
   *   get:
   *     summary: 모든 유저의 작물 성장 단계 조회
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/plant_grade_with_user'
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/plant_grade_with_user'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.get("/grade", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/grade/:user-id:
   *   get:
   *     summary: 특정 유저의 작물 성장 단계 조회
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/plant_grade_with_user'
   *     parameters:
   *       - name: user-id
   *         in: query
   *         required: true
   *         description: 유저의 고유 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/plant_grade_with_user'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.get("/grade/:user-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 작물의 성장단계 로그 생성 (측정시작), 작물 생성과 동시에 일어나야함/// 백엔드 서비스
  router.post("/create-plant-grade-log", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  // 특정 시간이 지나면 작물의 성장단계 업데이트// 벡엔드 서비스
  router.patch("/update-plant-grade-log", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  //작물 정보 업데이트(성장단계)  // 백엔드 서비스
  router.patch("/update-plant", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/guest-book:
   *   post:
   *     summary: 새로운 방명록 작성
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     parameters:
   *       - name: writer
   *         in: query
   *         required: true
   *         description: 방명록 작성자
   *         schema:
   *           type: string
   *       - name: content
   *         in: query
   *         required: true
   *         description: 방명록 내용
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 방명록 생성 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.post("/guest-book", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/guest-book:
   *   get:
   *     summary: 방명록 불러오기
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     responses:
   *       200:
   *         description: 방명록 조회 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.get("/guest-book", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/guest-book:
   *   patch:
   *     summary: 방명록 수정
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     parameters:
   *       - name: writer
   *         in: query
   *         required: true
   *         description: 방명록 작성자
   *         schema:
   *           type: string
   *       - name: content
   *         in: query
   *         required: true
   *         description: 방명록 내용
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 방명록 수정 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.patch("/guest-book", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/plant/guest-book:
   *   delete:
   *     summary: 방명록 불러오기
   *     tags: [plant]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/guest_books'
   *     responses:
   *       200:
   *         description: 방명록 삭제 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/guest_books'
   *       400:
   *         description: Invalid.
   *
   *
   */
  router.delete("/guest-book", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  return router;
};
