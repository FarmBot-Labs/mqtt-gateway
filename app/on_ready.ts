import { authenticate } from "./security/authenticate";
import { authorizePublish } from "./security/authorize_publish";
import { authorizeSubscribe } from "./security/authorize_subscribe";
import { log } from "./logger";

module.exports = (server) => () => {
    log("Server online");
    startLogging(server);
    startSecurity(server);
};

function startSecurity(server) {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
}

function startLogging(server) {
    [
        "clientConnected",
        "clientDisconnecting",
        "clientDisconnected",
        "published",
        "subscribed",
        "unsubscribed",
        "error"
    ].forEach(function (event) {
        server.on(event, function () {
            log("" + event + " event.");
        });
    });
}