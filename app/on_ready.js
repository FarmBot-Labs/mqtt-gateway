"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authenticate_1 = require("./authentication/authenticate");
var authorize_publish_1 = require("./authorization/authorize_publish");
var authorize_subscribe_1 = require("./authorization/authorize_subscribe");
var logger_1 = require("./logger");
exports.onReady = function (server) { return function () {
    logger_1.log("Server online");
    server.on("clientConnected", function () { return logger_1.log("clientConnected"); });
    server.on("clientDisconnecting", function () { return logger_1.log("clientDisconnecting"); });
    server.on("clientDisconnected", function () { return logger_1.log("clientDisconnected"); });
    server.on("published", function () {
        logger_1.log("\n=== Incoming Message ===");
        var output;
        try {
            console.log(arguments[0].topic);
            var s = String.fromCharCode.apply(null, new Uint16Array(arguments[0].payload));
            output = JSON.stringify(JSON.parse(s), null, 2);
        }
        catch (error) {
            output = arguments[0].payload;
        }
        finally {
            console.log(output);
        }
    });
    server.on("subscribed", function () { return logger_1.log("subscribed"); });
    server.on("unsubscribed", function () { return logger_1.log("unsubscribed"); });
    server.on("error", function () { return logger_1.log("error"); });
    server.authenticate = authenticate_1.authenticate;
    server.authorizePublish = authorize_publish_1.authorizePublish;
    server.authorizeSubscribe = authorize_subscribe_1.authorizeSubscribe;
}; };
