const mqtt = require("mqtt");

const client = mqtt.connect();

// 퍼블리셔 예시 --디바이스 영역
setInterval(() => {
  client.publish("location/device1/temperature", 25.6); // test 토픽으로 메시지:"hello mqtt"를 전송
}, 2000);

//구독자 예시 --백엔드 영역

client.on("connect", () => {
  client.subscribe("location/device1/temperature", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("subscribe success!");
    }
  });
});
client.on("message", (topic, payload) => {
  const message = JSON.parse(payload.toString());
  console.log(`${topic}`, message);
});
