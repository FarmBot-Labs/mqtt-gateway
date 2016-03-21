var http = require('http');
var mosca = require('mosca');
var authenticate = require('./app/security/authenticate');
var conf = require('./app/config');

var moscaSettings = {
  port: conf.mqttPort,
  http: { // for teh websockets
    port: conf.httpPort,
    bundle: true,
    static: './frontend'
  }
};

// fired when the mqtt server is ready

var server = new mosca.Server(moscaSettings);   //here we start mosca

server.on('*',function (arg) {
  console.log("SOME EVENT!")
  console.dir(arg)
})


server.on('ready', function() {
  console.log("Running!");
  server.authenticate = authenticate;
});  //on init it fires up setup()

server.on('clientConnected',function () {
  console.log("clientConnected!")
})

server.on('clientDisconnecting',function () {
  console.log("clientDisconnecting!")
})

server.on('clientDisconnected',function () {
  console.log("clientDisconnected!")
})

server.on('published',function () {
  console.log("published!")
})

server.on('subscribed',function () {
  console.log("subscribed!")
})

server.on('unsubscribed',function () {
  console.log("unsubscribed!")
})

server.on('error',function () {
  console.log("error!")
})
