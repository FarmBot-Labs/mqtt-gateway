// TODO: Change this default to "my.farmbot.io" post-launch

module.exports = {
  webAppUrl: process.env.WEB_APP_URL || "http://localhost:3000",
  httpPort:  process.env.PORT || 3002,
  mqttPort:  1883 // TODO: How to expose multiple ports with Dokku??
}
