// If a user has a bot of id XYZ, then they may access any topic
// following pattern bot/XYZ/#

module.exports = function (client, topic) {
    var hasBot = topic && client && client.permissions && client.permissions.bot;
    if (!hasBot) {
        console.warn("Tried to access topic " + (topic || "???") + " but no bot/topic provided.");
        return false;
    };
    var botID = client.permissions.bot;
    var allowedTopic = "bot/" + botID;
    return topic.startsWith(allowedTopic);
}