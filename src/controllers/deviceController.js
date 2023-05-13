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
 *                       user_id:
 *                         type: number
 *                       created_at:
 *                         type: string
 *                       updated_at:
 *                         type: string
 *                       deleted_at:
 *                         type: string
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
 *               id:
 *                type: number
 *     responses:
 *       200:
 *         description: 디바이스 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: ok
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
 *     summary: 액츄에이터 제어 명령 조회(이 부분은 postman에서 검사해주세요 스웨거에서는 안되는데 이유를 못 찾음)
 *     tags: [device]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 액츄에이터 제어 명령 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     device_id:
 *                       type: number
 *                     wind_command:
 *                       type: boolean
 *                     water_command:
 *                       type: boolean
 *                     light_command:
 *                       type: boolean
 *                     id:
 *                       type: number
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
 *     summary: 액츄에이터 제어 명령(이 부분은 postman에서 검사해주세요 스웨거에서는 안되는데 이유를 못 찾음)
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
 *               wind_command:
 *                type: boolean
 *               water_command:
 *                type: boolean
 *               light_command:
 *                type: boolean   
 *     responses:
 *       200:
 *         description: 액츄에이터 제어 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: ok
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
 * /api/v1/device/{device_id}:
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
 *                     user_id:
 *                       type: number
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                     deleted_at:
 *                       type: string
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
 *                     temperature:
 *                       type: number
 *                     humid:
 *                       type: number
 *                     moisture:
 *                       type: number
 *                     bright:
 *                       type: number
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
