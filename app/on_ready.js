var authenticate = require("./security/authenticate");
var authorizePublish = require("./security/authorize_publish");
var authorizeSubscribe = require("./security/authorize_subscribe");
var log = require("./logger");

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