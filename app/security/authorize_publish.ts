import { canUseTopic } from "./can_use_topic";

export function authorizePublish(client, topic, payload, callback) {
  callback(null, canUseTopic(client, topic));
}