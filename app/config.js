// TODO: Clean up ENV management into something less crappy.
// or use a 3rd party node ENV manager module.

var webAppUrl;
var log = require("./logger");

if (process.env.WEB_API_URL) {
  webAppUrl = process.env.WEB_API_URL;
} else {
  missing("WEB_API_URL");
}

module.exports = {
  webAppUrl: webAppUrl,
  httpPort: 3002,
  mqttPort: 1883
}

function missing(varName) {
  log("You did not set the `" + varName + "` ENV var.");
}
