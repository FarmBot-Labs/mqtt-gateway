let url = require('../config').webAppUrl + "/api/public_key";
let get = require('axios').get;
let jwt = require('jsonwebtoken');
let log = require("../logger");

function keyOk(resp) {
  log("Downloaded certificate from " + url);
  return new Buffer(resp.data, 'utf8');
}

function no(error) {
  log("Unable to download certificate from " + url);
  log("Is the FarmBot API running?");
  process.exit();
}

let getCertificate = get(url).then(keyOk, no);

export default function verifyToken(token) {
  function no(error) {
    log("Unable to verify token " + url);
  }

  function ok(cert) {
    log("Did fetch certifiacte. Will verify token with certificate.");
    return jwt.verify(token, cert, { algorithms: ['RS256'] });
  }
  log("Will fetch certificate...")
  return getCertificate.then(ok, no)
};
