var auth = require("./authenticate");
var EMAIL = "test123@test.com";
var PASSWORD = "password123";

describe("authentication", function(){
  it("logs in and attaches JSON web token to user", function(done){
    var finished = false;
    var client = {};
    var callback = function(_, isAuthorized){
      expect(isAuthorized).toBeTruthy();
      expect(client.permissions).toBeDefined();
      expect(client.permissions.sub).toBe(EMAIL);
      done();
    };
    auth(client, EMAIL, PASSWORD, callback);
  })
});
