let canUseTopic = require("./can_use_topic");

export default function authorizeSubscribe(client, topic, callback) {
  callback(null, canUseTopic(client, topic));
}