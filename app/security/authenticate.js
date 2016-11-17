// test@test.com password123
var fetchToken = require("./fetch_token");
var verifyToken = require("./verify_token");
var log = require("../logger");

function determineAuthStrategy(username, password) {
    // Really long password? Probably a JWT.
    if (password.length > 100) {
        return verifyToken;
    } else {
        return fetchToken;
    }
};

// TODO This app needs a logger.
module.exports = function(client, username, password, callback) {
    password = (password || "").toString();
    username = username || "";
    var auth = determineAuthStrategy(username, password);
    log("AUTH START")
    auth(password, username)
        .then(function(permissions) {
            log("AUTH OK " + username);
            client.permissions = permissions;
            callback(null, true);
        }, function(error) {
            log("AUTH FAIL " + username);
            log(error.message);
            dir(error);
            client.authError = error
            callback(null, false);
        });
}
