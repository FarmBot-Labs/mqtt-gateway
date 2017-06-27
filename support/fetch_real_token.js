"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p = axios_1.default.post("http://localhost:3000/api/tokens", {
    user: {
        email: "admin@admin.com",
        password: "password123"
    }
});
function fetchRealJWT() {
    function ok(resp) {
        return resp.data.token.encoded;
    }
    function no() {
        console.log("\n        We test the MQTT server against a real running API instance on localhost:3000.\n        Something went wrong while testing.\n        Usually, this means you are not running a server.\n        ");
    }
    return p.then(ok, no);
}
exports.fetchRealJWT = fetchRealJWT;
