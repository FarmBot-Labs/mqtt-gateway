var post = require('axios').post;
var config = require("../config");
var TOKEN_URL = "" + config.webAppUrl + '/api/tokens';

module.exports = function(username, password) {
  return post(TOKEN_URL, {
    user: {
      email: username,
      password: password
    }
  })
  .then(function(resp){
    return resp.data.token.unencoded
  });
}
