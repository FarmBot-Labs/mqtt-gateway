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
  console.log(1);
  var p = new Promise(function(ok, no) {
    console.log(2);
    httpCallback = function(error, response, body) {
      var isOK = (!error && response.statusCode === 200);
      console.log(3);
      var response = { error: error, response: response, body: body };
      (isOK) ? ok(response) : no(response);
    }
  });
  console.log(4);

  request(options, httpCallback);

  return p;
}
