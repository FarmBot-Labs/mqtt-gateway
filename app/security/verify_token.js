var url = require('../config').webAppUrl + "/api/public_key";
var get = require('axios').get;
var jwt = require('jsonwebtoken');

function keyOk(resp) {
  console.log("Downloaded certificate from " + url);
  return new Buffer(resp.data, 'utf8');
}

function no(error){
  console.log("Unable to download certificate from " + url);
}

var getCertificate = get(url).then(keyOk, no);

function verifyToken(token) {
  function no(error){
    console.log("Unable to verify token " + url);
  }

  function ok(cert) {
      console.log("Did fetch certifiacte. Will verify token with certificate.");
      return jwt.verify(token, cert, { algorithms: ['RS256'] });
  }
  console.log("Will fetch certificate...")
  return getCertificate.then(ok, no)
}

module.exports = verifyToken;
