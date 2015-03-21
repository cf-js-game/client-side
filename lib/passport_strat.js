'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      if (err) return done('db error');

      if (!user) return done('user not found');

      if (!user.validPassword(password)) return done('invalid password');

      return done(null, user);
    });
  }));
};
