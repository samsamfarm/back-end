require("dotenv").config();

const mqtt = require("mqtt");

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: "mqtt",
};

class MqttHandler {
  constructor() {
    this.client = mqtt.connect(options);
  }

  subscribe(topic) {
    this.client.on("connect", () => {
      this.client.subscribe(topic, (error) => {
        if (!error) {
          console.log(`Mqtt subscribed to ${topic}`);
        }
      });
    });
  }

  getMassage(callback) {
    this.client.on("message", (topic, message) => {
      const data = {
        device_id: message.device_id,
        temperature: message.temperature,
        humid: message.temperature,
        moisture: message.humidity,
        bright: message.bright,
        creatd_at: new Date(),
      };
      callback(data);
    });
  }

  publish(topic, message) {
    this.client.publish(topic, JSON.stringify(message));
    console.log(`Published ${JSON.stringify(message)} to ${topic}`);
  }
}

module.exports = MqttHandler;
