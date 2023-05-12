const mqtt = require("mqtt");

const knexClient = require("../../config/knexClient");

class MqttHandler {
  constructor() {
    const config = {
      host: process.env.MQTT_HOST,
      port: process.env.MQTT_PORT,
      protocol: "mqtt",
    };

    this.client = mqtt.connect(config);
    this.db = knexClient;
  }

  subscribeByDevicePlant() {
    this.client.on("connect", () => {
      this.client.subscribe("device/plant", (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    this.client.on("message", async (topic, message) => {
      console.log(topic, message.toString());
      try {
        const jsonFormat = JSON.parse(message.toString());
        if (jsonFormat?.device_id == null) {
          jsonFormat.device_id = 1;
        }

        await this.db("device_logs").insert({
          device_id: jsonFormat?.device_id,
          temperature: jsonFormat.temperature,
          humid: jsonFormat.humid,
          moisture: jsonFormat.moisture,
          bright: jsonFormat.bright,
          created_at: jsonFormat.timestamp,
        });
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
        this.client.publish("actuator/control", JSON.stringify(message));
      });
    } catch (error) {
      // console.log("16df8ddb-5e40-4a0b-b4c0-54edfadb213e", error);
    }
  }
}

module.exports = MqttHandler;
