var config = require("../config");
var request = require("http").request;

var TOKEN_URL = "" + config.webAppUrl + '/api/tokens';

function requestConfig(username, password) {
  return {
    url: TOKEN_URL,
    json: true,
    multipart: {
      chunked: false,
      data: {
        'content-type': 'application/json',
        body: [{
                  user: {
                    email: username,
                    password: password
                  }
                }]
      }
    }
  }
}

module.exports = function(username, password) {
  var options = requestConfig(username, password);
  var httpCallback;

  var p = new Promise(function(ok, no) {
    httpCallback = function(error, response, body) {
      var isOK = (!error && response.statusCode === 200);
      var response = { error: error, response: response, body: body };
      (isOK) ? ok(response) : no(response);
    }
  });

  request(options, httpCallback);

  return p;
}
