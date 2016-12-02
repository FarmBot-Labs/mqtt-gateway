import { canUseTopic } from "./can_use_topic";

export function authorizeSubscribe(client, topic, callback) {
    callback(null, canUseTopic(client, topic));
}
