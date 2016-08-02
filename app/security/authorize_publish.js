var canUseTopic = require("./can_use_topic");

module.exports = function authorizePublish(client, topic, payload, callback) {  
  callback(null, canUseTopic(client, topic));
}