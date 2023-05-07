const express = require("express");
const MqttHandeler = require("../workers/mqtt/mqttHandler");

module.exports = (connection) => {
  const router = express.Router();
  const mqttHandler = new MqttHandeler();
  mqttHandler.subscribe(`device/+/plant/#`);
  mqttHandler.getMassage (async (data) => {
   try {
    await connection
      .promise()
      .query(
        `INSERT INTO device_logs (device_id, temperature, humid, moisture, bright, creatd_at) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          data.device_id,
          data.temperature,
          data.humid,
          data.moisture,
          data.bright,
          data.timestamp,
        ]
      );
    } catch (error) {
        next(error);
    }
  });

  // a0, a1 ~~~ z9까지 랜덤 식별번호 부여
  const generateDeviceOrder = () => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const alphabet = [...Array(26)].map((_, i) =>
      String.fromCharCode(`a`.charCodeAt(0) + i)
    );
    const numbers = [...Array(10).keys()];
    const orders = shuffleArray(
      alphabet.flatMap((alp) => numbers.map((num) => alp + num))
    );
    const randomIndex = Math.floor(Math.random() * orders.length);
    return orders[randomIndex];
  };

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
      const device_order = generateDeviceOrder();
      const result = await connection.promise().query(
        `INSERT INTO devices (user_id, device_order) VALUES (?, ?)`,
      [user_id, device_order]
    );
    res.status(200).json({ result });
    } catch (error) {
    next(error);
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
  router.patch("", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });

  // 디바이스 삭제
  router.delete("", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(err);
    }
  });



  //프론트가 get요청하면 => select * limit 1로 보내줌
  router.get(`/plant-data/:user-id`, async (req, res) => {
    try{
    const user_id = req.params.user-id;
    const result = await connection.promise().query(
      `SELECT temperature, humid, moisture, bright, devices.user_id FROM device_logs
      JOIN devices ON device_logs.device_id = devices.id
      WHERE devices.user_id = ?
      ORDER BY created_at DESC
      LIMIT 1`,
      [user_id]
    ); 
    res.status(200).json({result});
    } catch(error) {
      next(error)
    }
  })

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
  })

   return router;
};
