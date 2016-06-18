// TODO: Clean up ENV management into something less crappy.
// or use a 3rd party node ENV manager module.

var webAppUrl, port;

if (process.env.WEB_APP_URL) {
  webAppUrl = process.env.WEB_APP_URL;
} else {
  missing("WEB_APP_URL");
}

if (parseInt(process.env.PORT) > 1) {
  port = parseInt(process.env.PORT);
} else {
  missing("PORT")
}

module.exports = {
  webAppUrl: webAppUrl,
  httpPort:  port,
  mqttPort:  1883
}

function missing(varName) {
  throw new Error("You did not set the `" + varName + "` ENV var.");
  process.exit();
}
