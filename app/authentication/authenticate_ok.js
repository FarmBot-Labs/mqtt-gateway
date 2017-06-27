"use strict";
var logger_1 = require("../logger");
/** Creates a function that is triggered when a JWT is invalid. */
function authenticateOk(client, callback, username) {
    return function (permissions) {
        logger_1.log("AUTH OK " + username);
        client.permissions = permissions;
        callback(null, true);
    };
}
exports.authenticateOk = authenticateOk;
