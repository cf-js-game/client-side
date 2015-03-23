'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var Cookies = require('cookies-js');
var request = require('superagent');

var UserStore = Fluxxor.createStore({
  initialize: function() {
    this.eat = Cookies.get('eat') || '';

    console.log("UserStore this.bindActions");
    this.bindActions(
      constants.LOGIN, this.onLogin,
      constants.CREATE_USER, this.onCreateUser,
      constants.DISPLAY_CREATE_USER, this.onDisplayCreateUser,
      constants.DISPLAY_LOGIN, this.onDisplayLogin
    );
    console.log("after UserStore this.bindActions");
  },

  onDisplayCreateUser: function(user) {
    this.emit('change');
  },

  onDisplayLogin: function(user) {
    this.emit('change');
  },

  onCreateUser: function(user) {
    user.email = user.username;

    request
      .post('/api/v1/create_user')
      .send(user)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.eat = res.body.eat;
        Cookies.set('eat', this.eat);
        this.emit('change');
      }.bind(this));

  },

  onLogin: function(user) {
    console.log("onLogin");
    request
      .get('/api/v1/sign_in')
      .auth(user.username, user.password)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.eat = res.body.eat;
        Cookies.set('eat', this.eat);
        this.emit('change');
      }.bind(this));

  },

  getState: function() {
    return {
      eat: this.eat
    };
  }
});

module.exports = UserStore;
