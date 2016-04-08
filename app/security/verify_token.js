var url = require('../config').webAppUrl + "/api/public_key";
var get = require('axios').get;
var jwt = require('jsonwebtoken');

function keyOk(resp){ return new Buffer(resp.data, 'utf8'); }

function no(error){
  console.warn("ERROR VERIFYING JWT!!!");
  console.dir(error);
}

var getCertificate = get(url).then(keyOk, no);

function verifyToken(token) {
  function ok(cert) {
      return jwt.verify(token, cert, { algorithms: ['RS256'] });
  }

  return getCertificate.then(ok, no)
}

module.exports = verifyToken;
