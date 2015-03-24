'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var Cookies = require('cookies-js');
var request = require('superagent');

var UserStore = Fluxxor.createStore({
  initialize: function() {
    this.token = Cookies.get('token') || '';

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
    //user.email = user.username;
    console.log("onCreateUser");
    console.log(user);
    request
      .post('/api/v1/create_user')
      .send(user)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.token = res.body.token;
        console.log(this.token);
        Cookies.set('token', this.token);
        this.emit('change');
      }.bind(this));

  },

  onLogin: function(user) {
    console.log("onLogin");
    console.log(user);
    request
      .get('/api/v1/sign_in')
      .auth(user.email, user.password)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.token = res.body.token;
        console.log("this.token returned by login");
        console.log(this.token)

        Cookies.set('token', this.token);
        // commented this out because
        // .. in login.js need to call getUsersCharacters first
        //this.emit('change');
      }.bind(this));

  },

  getState: function() {
    return {
      token: this.token
    };
  }
});

module.exports = UserStore;
