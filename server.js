'use strict';

var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/jsgame_dev');

app.listen(port, function() {
  console.log('server listening on port ' + port);
});
