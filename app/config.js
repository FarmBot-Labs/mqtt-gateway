var log = require("./logger");

// TODO: Clean up ENV management into something less crappy.
// or use a 3rd party node ENV manager module.
var DEFAULT_URL = "http://localhost:3000";

var webAppUrl;
if (process.env.WEB_API_URL) {
    webAppUrl = process.env.WEB_API_URL;
} else {
    webAppUrl = DEFAULT_URL;
    log("You did not set WEB_API_URL. Defaulting to " + DEFAULT_URL);
}

module.exports = {
    webAppUrl: webAppUrl,
    httpPort: 3002,
    mqttPort: 1883
}
