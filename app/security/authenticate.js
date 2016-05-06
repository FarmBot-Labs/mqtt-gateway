// test@test.com password123
var fetchToken = require("./fetch_token");
var verifyToken = require("./verify_token");

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
  auth(password, username)
    .then(function(permissions){
      console.log("Login OK for " + username);
      client.permissions = permissions;
      callback(null, true);
    }, function(error){
      console.log("Failed to authorize " + username);
      console.log(error.message);
      console.dir(error);
      client.authError = error
      callback(null, false);
    });
}
