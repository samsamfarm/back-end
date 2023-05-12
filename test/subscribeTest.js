require("dotenv").config();

const mqtt = require("mqtt");

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: "mqtt",
};

const client = mqtt.connect(options);
client.on("connect", () => {
  client.subscribe("device/plant", (err) => {
    if (err) {
      console.log(err);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(topic, message.toString());
});
