"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test@test.com password123
var verify_token_1 = require("../security/verify_token");
var logger_1 = require("../logger");
var authenticate_ok_1 = require("./authenticate_ok");
var authenticate_no_1 = require("./authenticate_no");
/** Determine if user is authorized to use the server. */
function authenticate(client, username, password, callback) {
    logger_1.log("AUTH START");
    var ok = authenticate_ok_1.authenticateOk(client, callback, username);
    var no = authenticate_no_1.authenticateNo(client, callback, username);
    if (username && password) {
        verify_token_1.verifyToken(password.toString()).then(ok, no);
    }
    else {
        no(new Error("username and password required"));
    }
}
exports.authenticate = authenticate;
