const express = require("express");
const MqttHandler = require("../workers/mqtt/mqttWorker");
const knex = require("../config/knexClient");
const router = express.Router();
const deviceControlDTO = require("../dtos/deviceControlDTO");
const DeviceService = require('../services/deviceService');

const deviceService = new DeviceService();

  /**
   * @swagger
   * /api/v1/device:
   *   post:
   *     summary: 새로운 디바이스 생성(새로운 회원에게 배정)
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
  router.post("/", async (req, res, next) => {
    try {
      // DTO 생략(확정된 내용이 없음)
      const { device_id: deviceId } = req.body;
      const userId = req?.session?.user_id || 7;

      await deviceService.validateDeviceId(deviceId);

      await deviceService.createDevice(deviceId, userId);

      res.json({data: 'ok'});
    } catch (error) {
      next(error);
    }
  });

/**
   * @swagger
   * /api/v1/device/:id:
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
  router.get("/:id", async (req, res, next) => {
    try {
      const deviceId = req.params.id;

      await deviceService.validateDeviceId(deviceId);
      
      await deviceService.vaildateNotFoundByDeviceId(deviceId);

      const device = await deviceService.getDeviceById(deviceId);

      res.send(device)
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/v1/device:
   *   get:
   *     summary: 전체 디바이스 목록 조회 
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
      const devices = await deviceService.getDevices();

      res.send(devices);
    } catch(err) {
      next(err);
    }
  })

  // NOTE: 디바이스 로그의 데이터 보내주기
  // TODO: 프론트가 get요청하면 => select * limit 1로 보내줌
  router.get("/plant-data/:user_id", async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const result = await knex("device_logs")
        .join("devices", "device_logs.device_id", "=", "devices.id")
        .select(
          "device_logs.temperature",
          "device_logs.humid",
          "device_logs.moisture",
          "device_logs.bright",
          "devices.user_id"
        )
        .where("devices.user_id", user_id)
        .orderBy("device_logs.created_at", "desc")
        .limit(1);

      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  });

  // NOTE: 엑츄에이터 제어 명령
  // TODO: 프론트에게 데이터를 받는다(post) => body로 데이터가 담겨져 오면 => publish로 디바이스에게 발행
  router.post(`/control`, async (req, res, next) => {
    try {
      const {command} = new deviceControlDTO(req.body);
      
      await deviceService.sendMQTTByMessage(data);
      
      res.json({data: 'success'})
      
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
