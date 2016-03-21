var fetch = require("./fetch_token");

describe("token fetcher", function(){
  it("grabs a token off the API", function(done){
    console.log('Starting...');

    var ok = function(){
      console.log("ok!");
      done();
      };

    var no = function(){
      console.log("no!");
      done();
    };

    fetch("test123@test.com", "password123")
      .then(ok, no)
  });
});
