var auth = require("../../app/security/authenticate");
var verify = require('../../app/security/verify_token');
var fetchRealJWT = require("../support/fetch_real_jwt");
var EMAIL = "admin@admin.com";
var PASSWORD = "password123";
var validJWT;
var invalidJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE0NTg4MTk1MzYsImp0aSI6ImE0MWQxMGU1LTk3NDUtNDEzOS1hYmJlLWQ5MjgzY2M2MGRjMiIsImlzcyI6ImZhcm1ib3Qtd2ViLWFwcCIsImV4cCI6MTQ1OTE2NTEzNiwiYWxnIjoiUlMyNTYifQ.reuRxMr_WMgu9prisSjGBuIuKRQw9Tmc5U_kWJyzFm0';

describe("token verification", function () {
  beforeAll(function(done) {
    fetchRealJWT()
      .then(function(token) {
        validJWT = token;
        done();
      })
  })
  it("knows when you're lying", function () {
    function assertions(error) {
      expect(error.message).toBeDefined();
      done();
    }
    verify(invalidJWT).then(assertions, assertions)
  });

  it("knows when you're telling the truth", function (done) {
    function assertions(data) {
      expect(data.sub).toEqual('admin@admin.com');
      expect(data.iss).toEqual('//localhost:3000');
      done();
    }

    function failure(error) {
      fail("Failed to validate JWT. Error is above.");
      done();
    }
    verify(validJWT).then(assertions, failure)
  });
});
