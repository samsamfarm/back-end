const knex = require("../config/knexClient");
const express = require("express");

const router = express.Router();

const DeviceService = require("../services/deviceService");
const {ActuatorCommandDTO} = require("../dtos/actuatorDto")
const ActuatorService = require("../services/actuatorService");

const deviceService = new DeviceService();
const actuatorService = new ActuatorService()

/**
 * @swagger
 * /api/v1/device:
 *   get:
 *     summary: 모든 디바이스 목록 조회
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 전체 디바이스 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       user_id:
 *                         type: number
 *                         example: 123
 *                       created_at:
 *                         type: string
 *                         example: "2023-05-14T12:34:56Z"
 *                       updated_at:
 *                         type: string
 *                         example: "2023-05-14T13:45:00Z"
 *                       deleted_at:
 *                         type: string
 *                         example: null
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/", async (req, res, next) => {
  try {
    const devices = await deviceService.getDevices();

    res.send({ data: devices });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/device:
 *   post:
 *     summary: 디바이스 생성
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                type: number
 *                example: 5
 *     responses:
 *       200:
 *         description: 디바이스 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: ok
 *       400:
 *         description: BAD_REQUEST.
 */
router.post("/", async (req, res, next) => {
  try {
    // DTO 생략(확정된 내용이 없음)
    const { device_id: deviceId } = req.body;
    const userId = req.user.id;

    await deviceService.validateDeviceId(deviceId); 

    await deviceService.createDevice(deviceId, userId);

    res.json({ data: 'ok' });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/device/control:
 *   get:
 *     summary: 액츄에이터 제어 명령 조회
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 전체 디바이스 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       user_id:
 *                         type: number
 *                         example: 123
 *                       created_at:
 *                         type: string
 *                         example: "2023-05-14T12:34:56Z"
 *                       updated_at:
 *                         type: string
 *                         example: "2023-05-14T13:45:00Z"
 *                       deleted_at:
 *                         type: string
 *                         example: null
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/control", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await actuatorService.getActuatorsByUserId(userId);

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/device/control:
 *   post:
 *     summary: 액츄에이터 제어 명령
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: number
 *                 example: 5
 *               wind_command:
 *                 type: boolean
 *                 example: true
 *               water_command:
 *                 type: boolean
 *                 example: false
 *               light_command:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: 액츄에이터 제어 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: ok
 *       400:
 *         description: BAD_REQUEST.
 */
router.post("/control", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data } = new ActuatorCommandDTO(req.body);
    
    if (data.deviceId != null) {
      await deviceService.validateByUserIdAndDeviceId(userId, data.deviceId);
    } else {
      data.deviceId = (await deviceService.getDeviceByUserId(userId)).id;
    }

    await actuatorService.updateActuatorCommandToDB(data);

    res.json({ data: "success" });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/device/{id}:
 *   get:
 *     summary: 디바이스 조회
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: device_id
 *         schema:
 *           type: number
 *         required: true
 *         description: 디바이스 ID
 *     responses:
 *       200:
 *         description: 디바이스 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 123
 *                     user_id:
 *                       type: number
 *                       example: 456
 *                     created_at:
 *                       type: string
 *                       example: "2023-05-14T12:34:56Z"
 *                     updated_at:
 *                       type: string
 *                       example: "2023-05-14T13:45:00Z"
 *                     deleted_at:
 *                       type: string
 *                       example: null
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const deviceId = req.params.id;

    await deviceService.validateDeviceId(deviceId);

    await deviceService.vaildateNotFoundByDeviceId(deviceId);

    const device = await deviceService.getDeviceById(deviceId);

    res.send({ data: device });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/device/plant-data/{device_id}:
 *   get:
 *     summary: 가장 최근 센서 데이터 조회
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: device_id
 *         schema:
 *           type: number
 *         required: true
 *         description: 디바이스 ID
 *         example: 123
 *     responses:
 *       200:
 *         description: 센서 데이터 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 123
 *                     temperature:
 *                       type: number
 *                       example: 25.4
 *                     humid:
 *                       type: number
 *                       example: 60.2
 *                     moisture:
 *                       type: number
 *                       example: 35.8
 *                     bright:
 *                       type: number
 *                       example: 200
 *       400:
 *         description: BAD_REQUEST.
 */
router.get("/plant-data/:device_id", async (req, res, next) => {
  try {
    const deviceId = req.params.device_id;
    const result = await deviceService.getDeviceLogById(deviceId);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
