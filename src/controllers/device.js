const express = require("express");
const MqttHandler = require("../workers/mqtt/mqttHandler");
const knex = require("../config/knexClient");

const router = express.Router();

const mqttHandler = new MqttHandler();

mqttHandler.subscribe(`device/+/plant/#`);
mqttHandler.getMassage (async (data) => {
 try {
   await knex("device_logs").insert({
     device_id: data.device_id,
     temperature: data.temperature,
     humid: data.humid,
     moisture: data.moisture,
     bright: data.bright,
     created_at: data.timestamp,
   });
 } catch (error) {
   next(error);
 }
  });

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
      const { user_id } = req.body;
      const [device_id] = await knex("devices").insert({ user_id });

      res.status(201).json({
        message: "new device created",
        device: { device_id, user_id },
      });
    } catch (error) {
      next(error);
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

  /**
   * @swagger
   * /api/device:
   *   get:
   *     summary: 전체 디바이스 목록 조회 (생성일 순서)
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
  
  

  

  //디바이스 로그의 데이터 보내주기
  //프론트가 get요청하면 => select * limit 1로 보내줌
  router.get(`/plant-data/:user-id`, async (req, res) => {
    try{
    const user_id = req.params.user-id;
    const result = await connection.promise().query(
      `SELECT temperature, humid, moisture, bright, devices.user_id
       FROM
        device_logs
      JOIN
       devices ON device_logs.device_id = devices.id
      WHERE 
        devices.user_id = ?
      ORDER BY
       created_at DESC
      LIMIT 1`, [user_id]
    ); 
    res.status(200).json({result});
    } catch(error) {
      next(error)
    }
  })

  //엑츄에이터 제어 명령
  // 프론트에게 데이터를 받는다(post) => body로 데이터가 담겨져 오면 => publish로 디바이스에게 발행
  router.post(`/control`, (req, res) => {
    const {device_id,temperature, humid, moisture, bright} = req.body;
    const message = {
      device_id,
      temperature,
      humid,
      moisture,
      bright
    };
    mqttHandler.publish(`plant/control-data`, message);
    res.send(`Please set data like this ${message}`)
  });

module.exports = router;
