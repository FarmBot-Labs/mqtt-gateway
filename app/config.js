"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
exports.webAppUrl = process.env.WEB_API_URL || "http://localhost:3000";
logger_1.log("Using " + exports.webAppUrl + " as API URL");
function generateConfig(sslDomain) {
    if (sslDomain === void 0) { sslDomain = ""; }
    var SSL_DIR = "/etc/letsencrypt/live/" + sslDomain + "/";
    var config = {
        allowNonSecure: true,
        port: 1883,
        http: {
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
exports.generateConfig = generateConfig;
