// mqtt 데이터 받아오는 예시

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost");
client.on("connect", () => {
  client.subscribe("mytopic");
});
client.on("message", (topic, message) => {
  const data = {
    device_id: message.device_id,
    temperature: message.temperature,
    humidity: message.humidity,
    timestamp: new Date(),
  };
  connection.query("INSERT INTO data SET ?", data, (error, results, fields) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
    }
  });
});
