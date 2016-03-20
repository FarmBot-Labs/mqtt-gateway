var client = require('mqtt').connect("ws://localhost:3000/mosca");

client.subscribe("#");



function puts(msg, topic){
  client.publish(topic || "mqtt/demo", msg || "empty");
}

function gets(topic, payload){
  console.log([topic, payload].join(": "))
}

client.on("message", gets);

window.puts = puts
