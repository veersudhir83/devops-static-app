/**
 * 
 */

var newrelic = require('newrelic');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'WebContent')));

var server = app.listen(process.env.VCAP_APP_PORT || 8000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("NodeServer listening at http://%s:%s", host, port);

});
