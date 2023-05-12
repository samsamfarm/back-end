require("dotenv").config();
const knexClient = require("../../config/knexClient");

const mqtt = require("mqtt");

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: "mqtt",
};

class MqttHandler {
  constructor() {
    this.client = mqtt.connect(options);
    this.db = knexClient;
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
      // buffer to JSON
      const jsonFormat = JSON.parse(message.toString());
      const data = {
        device_id: jsonFormat.device_id,
        temperature: jsonFormat.temperature,
        humid: jsonFormat.humid,
        moisture: jsonFormat.moisture,
        bright: jsonFormat.bright,
        creatd_at: jsonFormat.creatd_at,
      };
      callback(data);
    });
  }

  publish(topic, message) {
    this.client.publish(topic, JSON.stringify(message));
    console.log(`Published ${JSON.stringify(message)} to ${topic}`);
  }

  subscribeByDevicePlant() {
    this.subscribe(`device/+/plant/#`);
    this.getMassage(async (data) => {
      try {
        await this.db("device_logs").insert({
          device_id: data.device_id,
          temperature: data.temperature,
          humid: data.humid,
          moisture: data.moisture,
          bright: data.bright,
          created_at: data.timestamp,
        });

        const returnData = await this.db("device_logs")
          .select("*")
          .where({ device_id: data.device_id });
        console.log(returnData);
      } catch (error) {
        console.log(error);
      }
    });
  }
  
 
  actuatorControlToDevice() {
    this.db("actuators")
    .select("wind_command", "water_command", "light_command")
    .then(result => {
      const message = {
        wind_command: result[0].wind_command,
        water_command: result[0].water_command,
        light_command: result[0].light_command,
      };
      this.publish("actuator/controll", message );
    })
    .catch((error) => {
       console.log(error);
    })
  }
}
  

module.exports = MqttHandler;
