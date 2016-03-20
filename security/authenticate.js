// test@test.com password123
var fetchToken = require("./fetch_token");

module.exports = function(client, username, password, callback) {
  username = username || "NOTPROVIDED";
  password = (password || "NOTPROVIDED").toString()
  fetchToken(username, password)
    .then(function(response){
      console.log("User logged in");
      callback(null, true);
    })
    .catch(function(error){
      console.log("User login failed!")
      callback(null, false);
    });
}
