"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var axios_1 = require("axios");
var jwt = require("jsonwebtoken");
var logger_1 = require("../logger");
var url = config_1.webAppUrl + "/api/public_key";
function keyOk(resp) {
    logger_1.log("Downloaded certificate from " + url);
    return new Buffer(resp.data, "utf8");
}
function no(error) {
    logger_1.log("Unable to download certificate from " + url);
    logger_1.log("Is the FarmBot API running?");
    process.exit();
}
var getCertificate = axios_1.default.get(url).then(keyOk, no);
function verifyToken(token) {
    function no(error) {
        logger_1.log("Unable to verify token " + url);
    }
    function ok(cert) {
        logger_1.log("Did fetch certificate. Will verify token with certificate.");
        return jwt.verify(token, cert, { algorithms: ["RS256"] });
    }
    logger_1.log("Will fetch certificate...");
    return getCertificate.then(ok, no);
}
exports.verifyToken = verifyToken;
;
