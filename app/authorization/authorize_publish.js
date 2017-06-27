"use strict";
var can_use_topic_1 = require("./can_use_topic");
/** Determines if a user is allowed to publish to a particular topic. */
function authorizePublish(client, topic, payload, callback) {
    callback(null, can_use_topic_1.canUseTopic(client, topic));
}
exports.authorizePublish = authorizePublish;
