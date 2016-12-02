let post = require('axios').post;
let config = require("../config");
let TOKEN_URL = "" + config.webAppUrl + '/api/tokens';
let log = require("../logger");

export default function (password, username) {
  let params = {
    user: {
      email: username,
      password: password
    }
  };
  let email = params.user.email;
  let e = new Error(
    "Login credentials are too short. Use a JSON web token as password");
  return Promise.reject(e);
}
