"use strict";
var logger_1 = require("../logger");
/** Creates a function that is triggered when a JWT is invalid. */
function authenticateNo(client, callback, username) {
    return function (error) {
        logger_1.log("AUTH FAIL " + username);
        logger_1.log(error.message);
        logger_1.log(error);
        client.authError = error;
        callback(null, false);
    };
}
exports.authenticateNo = authenticateNo;
