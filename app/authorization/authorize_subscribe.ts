import { canUseTopic } from "./can_use_topic";

/** Determines if a user is allowed to listen to a particular topic. */
export function authorizeSubscribe(client, topic, callback) {
    callback(null, canUseTopic(client, topic));
}
