var fetch = require("./fetch_token");
var EMAIL = "test123@test.com";
var PASSWORD = "password123";

describe("token fetcher", function(){
  it("grabs a token off the API", function(done){
    var ok = function(jwt){
      expect(jwt.sub).toEqual(EMAIL);
      expect(jwt.iss).toEqual("farmbot-web-app");
      var keys = Object.keys(jwt);
      expect(keys).toInclude("iat");
      expect(keys).toInclude("exp");
      done();
    };

    var no = function(error){
      fail("Expected success response from server while testing token auth.");
    };

    fetch(EMAIL, PASSWORD).then(ok, no)
  });

  it("handles failure", function(done) {
    function onError(error) {
      expect(error.status).toEqual(422);
      done();
    }
    fetch(EMAIL, "wrong_password").catch(onError)
  });
});
