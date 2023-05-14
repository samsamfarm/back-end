require("dotenv").config();

const mqtt = require("mqtt");

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: "mqtt",
};

const client = mqtt.connect(options);

client.on("connect", () => {
  setInterval(() => {
    let info = {
      device_id: 1,
      temperature: 25.6,
      humid: 75,
      moisture: 65.6,
      bright: 500,
      created_at: new Date(),
    };
    let message = JSON.stringify(info);
    console.log("publishing", message);
    client.publish("device/plant", message);
  }, 10000);
});
