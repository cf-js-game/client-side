'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var Cookies = require('cookies-js');
var request = require('superagent');

var baseUrl = 'api/v1';

var CharStore = Fluxxor.createStore({
  initialize: function() {

    this.token = Cookies.get('token') || '';

    this.characters = [];

    this.selectedCharId = null;

    this.bindActions(
      constants.SELECT_CHAR, this.onSelectChar,
      constants.GET_USER_CHARS, this.getUsersCharacters
    );

  },

  getAllCharacters: function() {
    return this.characters;
  },

  getCharacter: function(charIdentifier) {
    // charIdentifier = { _id: charId }
    // get character from character array

    return { _id: '1', type: 'Rat',   damage: '1', melee: 'true', hp: '2'}
  },

  getSelectedCharId: function() {
    return this.selectedCharId;
  },

  getState: function() {
    console.log("char_store getState()");
    return {
      characters: this.characters,
      selectedCharId: this.selectedCharId
    }
  },

  onSelectChar: function(charId) {
    console.log("char_store   onRefreshCharDetail");
    console.log("this.emit(change)");
    this.selectedCharId = charId;
    this.emit('change');
  },

  getUsersCharacters: function(user) {
    console.log("char_store getUsersCharacters");
    console.log("token");
    console.log( Cookies.get('token'));

    function myTimer() {
        var token = Cookies.get('token');
        console.log("token");
        console.log(token);

        if (token) clearInterval(timerId);
    }

    // 1000 is one second
    var timerId = setInterval(function(){ myTimer() }, 1000);

    request
      .get(baseUrl + '/character_list')
      .set('token', Cookies.get('token'))
      .end(function(err, res) {
        if (err) return console.log(err);

        console.log("char_store initialize  res.body");
        console.log(res.body);
        this.characters = res.body;
        this.emit('change');
      }.bind(this));

  }

});

module.exports = CharStore;
