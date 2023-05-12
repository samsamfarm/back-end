const mqtt = require("mqtt");

const knexClient = require("../../config/knexClient");

class MqttHandler {
  constructor() {
    const config = {
      host: process.env.MQTT_HOST,
      port: process.env.MQTT_PORT,
      protocol: "mqtt",
    };

    this.client = mqtt.connect(this.config);
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
    this.subscribe(`device/plant`);
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

  async actuatorControlToDevice() {
    try {
      const actuators = await this.db("actuators").select(
        "wind_command",
        "water_command",
        "light_command",
        "device_id"
      );
      actuators.forEach((actuator) => {
        const message = {
          wind_command: actuator.wind_command,
          water_command: actuator.water_command,
          light_command: actuator.light_command,
        };
        //actuator/control
        this.publish(`actuator/${actuator.device_id}/control`, message);
      });
    } catch (error) {
      console.log("16df8ddb-5e40-4a0b-b4c0-54edfadb213e", error);
    }
  }
}

module.exports = MqttHandler;
