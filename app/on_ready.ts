let authenticate = require("./security/authenticate");
let authorizePublish = require("./security/authorize_publish");
let authorizeSubscribe = require("./security/authorize_subscribe");
let log = require("./logger");

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