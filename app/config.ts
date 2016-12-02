import { log } from "./logger";

// TODO: Clean up ENV management into something less crappy.
// or use a 3rd party node ENV manager module.
export let DEFAULT_URL = "http://localhost:3000";
export let webAppUrl;
export let httpPort = 3002;
export let mqttPort = 1883;

if (process.env.WEB_API_URL) {
    webAppUrl = process.env.WEB_API_URL;
} else {
    webAppUrl = DEFAULT_URL;
    log("You did not set WEB_API_URL. Defaulting to " + DEFAULT_URL);
}

