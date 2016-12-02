// test@test.com password123
let fetchToken = require("./fetch_token");
let verifyToken = require("./verify_token");
let log = require("../logger");

function determineAuthStrategy(username, password) {
    // Really long password? Probably a JWT.
    if (password.length > 100) {
        return verifyToken;
    } else {
        return fetchToken;
    }
};

export default function (client, username, password, callback) {
    password = (password || "").toString();
    username = username || "";
    let auth = determineAuthStrategy(username, password);
    if (client && client.connection && client.connection.stream) {
        log(client.connection.stream.remoteAddress);
    }
    log("AUTH START")
    auth(password, username)
        .then(function (permissions) {
            log("AUTH OK " + username);
            client.permissions = permissions;
            callback(null, true);
        }, function (error) {
            log("AUTH FAIL " + username);
            log(error.message);
            log(error);
            client.authError = error
            callback(null, false);
        });
}
