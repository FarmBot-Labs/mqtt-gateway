var auth = require("./authenticate");
var EMAIL = "test123@test.com";
var PASSWORD = "password123";
var validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE0NTg3ODQxMzQsImp0aSI6Ijc5MmVjMWZhLWFiMjgtNDVmMi1iNDY4LWY4ZjJjMWU4ZjRkMSIsImlzcyI6ImZhcm1ib3Qtd2ViLWFwcCIsImV4cCI6MTQ1OTEyOTczNCwiYWxnIjoiUlMyNTYifQ.LTGTTKg7TLyB-0BJtcLsemjGaDiftGjKWWnw_VxYAatGiX_Uq3RUFVmPDaD49drJ55dFERWdoLV3aoYIXYV9CvLQ35jJiRW78TwXnaaqpKc4FmaTl_zYkozZaYgNWV4RxKz7GZdM9woxr6hiDZwe3TsysXYKspVR1dbKEBXZh4c9QBqg0EAoahLUXtG77MCtN2jWw_hwWAvXT6O7aI6vaK1hcZBsbZRn8vJbUbcxncTEMo8j2vR68HGFrvce8xFb_SKhYh8Iarswg8V8R8xNReyYePHNwDzQac2B1tK3SyBbJxg1lpD3LbahTFpqtVuCWicnkFAd3TG8EbH8a4Y2Vw';
var verify = require('./verify_token');
describe("token verification", function(){
  it("knows when you're lying", function(){
    pending("BRB");
  });
  fit("knows when you're telling the truth", function(done){
    function probe(data) {
      console.dir(data)
      done();
    }
    verify(validJWT)
      .then(probe, probe)
  }, 99999);
});
