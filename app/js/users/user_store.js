'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var Cookies = require('cookies-js');
var request = require('superagent');

var baseUrl = 'api/v1';

var UserStore = Fluxxor.createStore({
  initialize: function() {
    this.token = Cookies.get('token') || '';

    // ----- from char_store.js ---------------
    this.characters = [];
    this.selectedCharId = null;
    // ----- end of  from char_store.js ---------------

    this.bindActions(
      constants.LOGIN, this.onLogin,
      constants.LOGOUT, this.onLogout,
      constants.CREATE_USER, this.onCreateUser,
      constants.DISPLAY_CREATE_USER, this.onDisplayCreateUser,
      constants.DISPLAY_LOGIN, this.onDisplayLogin,
      constants.SELECT_CHAR, this.onSelectChar,
      constants.GET_USER_CHARS, this.getUsersCharacters,
      constants.ADD_NEW_CHAR, this.onAddNewCharacter
    );

  },

  onDisplayCreateUser: function(user) {
    this.emit('change');
  },

  onDisplayLogin: function(user) {
    this.emit('change');
  },

  onCreateUser: function(user) {
    //user.email = user.username;

    request
      .post('/api/v1/create_user')
      .send(user)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.token = res.body.token;
        Cookies.set('token', this.token);
        this.emit('change');
      }.bind(this));

  },

  onLogin: function(user) {

    request
      .get('/api/v1/sign_in')
      .auth(user.email, user.password)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.token = res.body.token;

        Cookies.set('token', this.token);

        request
          .get('/api/v1/character_list')
          .set('token', res.body.token)
          .end(function(err, res) {
            if (err) return console.log(err);

            this.characters = res.body;
            this.emit('change');
          }.bind(this));

        //this.getFlux().actions.getUsersCharacters();
        // commented this out because
        // .. in login.js need to call getUsersCharacters first
        //this.emit('change');
      }.bind(this));

  },

  onLogout: function() {
    Cookies.set('token', '');
    this.token = '';
    this.emit('change');
  },

  onSelectChar: function(charId) {
    this.selectedCharId = charId;
    this.emit('change');
  },

  getUsersCharacters: function() {

    // function myTimer() {
    //     var token = Cookies.get('token');

    //     if (token) clearInterval(timerId);
    // }

    // 1000 is one second
    //var timerId = setInterval(function(){ myTimer() }, 1000);

    // this doesn't work
    // while (!Cookies.get('token')) {
    //   setTimeout(function(){ var doNothing = 1; }, 3000);
    // }

   request
      .get(baseUrl + '/character_list')
      .set('token', Cookies.get('token'))
      .end(function(err, res) {
        if (err) return console.log(err);

        this.characters = res.body;

        this.emit('change');
      }.bind(this));

  },

  onAddNewCharacter: function(newCharacter) {

    request
      .post (baseUrl + '/character_list')
      .send({"name": newCharacter.name, "token": Cookies.get('token')})
      .end(function(err, res) {
        if (err) return console.log(err);

        this.characters.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  // *** fix this !! ***
  getState: function() {
    return {
      token: this.token,
      characters: this.characters,
      selectedCharId: this.selectedCharId
    };
  }

});

module.exports = UserStore;
