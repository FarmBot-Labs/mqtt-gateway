"use strict";
var can_use_topic_1 = require("./can_use_topic");
/** Determines if a user is allowed to listen to a particular topic. */
function authorizeSubscribe(client, topic, callback) {
    callback(null, can_use_topic_1.canUseTopic(client, topic));
}
exports.authorizeSubscribe = authorizeSubscribe;
