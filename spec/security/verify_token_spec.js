var auth = require("./authenticate");
var EMAIL = "test123@test.com";
var PASSWORD = "password123";
var validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE0NTg4MjM2NjIsImp0aSI6IjU4ODdiYTdjLTYyZDItNDI1My1iNTIyLWZkYmUwNTNlYjNiZSIsImlzcyI6ImZhcm1ib3Qtd2ViLWFwcCIsImV4cCI6MTQ1OTE2OTI2Mn0.qGp7FsI8yIl_EHXBjjHjrYaSsNXVbSvgviqrWP0RjtY3qL0b3UIrEtH4C6OglmU3ATc5bHa0L-tzjenSMt05TlgZq7KwTri9QnF06WMCkvlO8xebRVXQxqFA3YpcIj_THYxS0Y0TDgIgs5TEURXjvRjPFhhP9i3tJXaYtWV-JQWLG6YlHMWYQvBLvuV4ckeW0tzEhPCe4t9YbmgnEV14ByLiQDihomdVd0nLdBZS7GnijPqUTeJxR_EdDKbqm6UmjZCReDompE0MK1mqbjbtxIiI-OGk9gq--gD-D1RkQfLj9W1_Ll8VSn7U15owqfMj8DKRdU5aKBhMmyfFbyg8Wg';
var invalidJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE0NTg4MTk1MzYsImp0aSI6ImE0MWQxMGU1LTk3NDUtNDEzOS1hYmJlLWQ5MjgzY2M2MGRjMiIsImlzcyI6ImZhcm1ib3Qtd2ViLWFwcCIsImV4cCI6MTQ1OTE2NTEzNiwiYWxnIjoiUlMyNTYifQ.reuRxMr_WMgu9prisSjGBuIuKRQw9Tmc5U_kWJyzFm0';
var verify = require('./verify_token');
describe("token verification", function(){
  it("knows when you're lying", function(){
    function assertions(error) {
      expect(error.message).toBeDefined();
      done();
    }
    verify(invalidJWT).then(assertions, assertions)
  });

  it("knows when you're telling the truth", function(done){
    function assertions(data) {
      expect(data.sub).toEqual('admin@admin.com');
      expect(data.iss).toEqual('farmbot-web-app');
      done();
    }

    function failure(error) {
      fail("Failed to validate JWT. Error is above.");
      done();
    }
    verify(validJWT).then(assertions, failure)
  });
});
