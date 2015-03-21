'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var passport_strat = require('./lib/passport_strat');
var userRoutes = require('./routes/user_routes');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/jsgame_dev');

// Security init
app.set('appSecret', process.env.SECRET || 'loot!loot!loot!loot!');
app.use(passport.initialize());
passport_strat(passport);

// Routes
var userRouter = express.Router();

userRoutes(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', userRouter);

// Server init
app.listen(port, function() {
  console.log('Server listening on port ' + port + '.');
});
