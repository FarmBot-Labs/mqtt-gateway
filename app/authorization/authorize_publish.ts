import { canUseTopic } from "./can_use_topic";

/** Determines if a user is allowed to publish to a particular topic. */
export function authorizePublish(client, topic, payload, callback) {
  callback(null, canUseTopic(client, topic));
}
