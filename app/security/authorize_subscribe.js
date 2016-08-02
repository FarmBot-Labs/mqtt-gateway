var canUseTopic = require("./can_use_topic");

module.exports = function authorizeSubscribe(client, topic, callback) {  
  callback(null, canUseTopic(client, topic));
}