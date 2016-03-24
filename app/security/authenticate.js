// test@test.com password123
var fetchToken = require("./fetch_token");

// TODO This app needs a logger.
module.exports = function(client, username, password, callback) {
  password = (password || "").toString();
  fetchToken(username || "", password)
    .then(function(permissions){
      client.permissions = permissions;
      callback(null, true);
    }, function(error){
      client.authError = error
      callback(null, false);
    });
}
