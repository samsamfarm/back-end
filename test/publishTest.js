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
    console.log("publishing");
    client.publish("test_topic", "hello world");
  }, 1000);
});
