import { log } from "../logger";

// If a user has a bot of id XYZ, then they may access any topic
// following pattern bot/XYZ/#

export default function (client, topic) {
    let hasBot = topic && client && client.permissions && client.permissions.bot;
    if (!hasBot) {
        log("Tried to access topic " + (topic || "???") + " but no bot/topic provided.");
        return false;
    };
    let botID = client.permissions.bot;
    let allowedTopic = "bot/" + botID;
    return topic.startsWith(allowedTopic);
}