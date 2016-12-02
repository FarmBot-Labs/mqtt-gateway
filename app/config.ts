import { log } from "./logger";
import { ServerOpts } from "mosca";

export let webAppUrl = process.env.WEB_API_URL || "http://localhost:3000";
log(`Using ${webAppUrl} as API URL`);

export function generateConfig(sslDomain = "") {
    const SSL_DIR = `/etc/letsencrypt/live/${sslDomain}/`;

    let config: ServerOpts = {
        allowNonSecure: true,
        port: 1883,
        http: { // for teh websockets
            port: 3002,
            bundle: true,
            static: "./public"
        },
        https: {
            port: 443
        },
        secure: {
            port: 8883,
            keyPath: SSL_DIR + "privkey.pem",
            certPath: SSL_DIR + "cert.pem"
        }
    };

    // Remove SSL features if SSL_DOMAIN
    // was not set.
    if (!sslDomain) {
        delete config.https;
        delete config.secure;
    }

    return config;
}
