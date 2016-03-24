var auth = require("./authenticate");
var EMAIL = "test123@test.com";
var PASSWORD = "password123";
var validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE0NTg4MjM2NjIsImp0aSI6IjU4ODdiYTdjLTYyZDItNDI1My1iNTIyLWZkYmUwNTNlYjNiZSIsImlzcyI6ImZhcm1ib3Qtd2ViLWFwcCIsImV4cCI6MTQ1OTE2OTI2Mn0.qGp7FsI8yIl_EHXBjjHjrYaSsNXVbSvgviqrWP0RjtY3qL0b3UIrEtH4C6OglmU3ATc5bHa0L-tzjenSMt05TlgZq7KwTri9QnF06WMCkvlO8xebRVXQxqFA3YpcIj_THYxS0Y0TDgIgs5TEURXjvRjPFhhP9i3tJXaYtWV-JQWLG6YlHMWYQvBLvuV4ckeW0tzEhPCe4t9YbmgnEV14ByLiQDihomdVd0nLdBZS7GnijPqUTeJxR_EdDKbqm6UmjZCReDompE0MK1mqbjbtxIiI-OGk9gq--gD-D1RkQfLj9W1_Ll8VSn7U15owqfMj8DKRdU5aKBhMmyfFbyg8Wg';

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

  it("logs in with a JWT as a password", function(done){
    var finished = false;
    var client = {};
    var callback = function(_, isAuthorized){
      expect(isAuthorized).toBeTruthy();
      expect(client.permissions).toBeDefined();
      expect(client.permissions.sub).toBe('admin@admin.com');
      done();
    };
    auth(client, EMAIL, validJWT, callback);
  })

});
