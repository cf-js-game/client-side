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
      constants.GET_USER_CHARS, this.getUsersCharacters,
      constants.ADD_NEW_CHAR, this.onAddNewCharacter
    );

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
    return {
      characters: this.characters,
      selectedCharId: this.selectedCharId
    }
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

    console.log("char_store send request to server getUsersCharacters()");
    request
      .get(baseUrl + '/character_list')
      .set('token', Cookies.get('token'))
      .end(function(err, res) {
        if (err) return console.log(err);

        this.characters = res.body;
        console.log("successful getUsersCharacters");
        console.log("characters");
        console.log(characters);
        this.emit('change');
      }.bind(this));

  }

});

module.exports = CharStore;
