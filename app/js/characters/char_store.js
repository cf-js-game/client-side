'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var Cookies = require('cookies-js');
var request = require('superagent');

var CharStore = Fluxxor.createStore({
  initialize: function() {

    this.characters = [
      { _id: '1', type: 'Rat',   damage: '1', melee: 'true', hp: '2'},
      { _id: '2', type: 'Snake', damage: '2', melee: 'true', hp: '3'}
    ];

    this.selectedCharId = null;

    this.eat = Cookies.get('eat') || '';

    this.bindActions(
      constants.SELECT_CHAR, this.onSelectChar
    );
    console.log("after UserStore this.bindActions");

  },

  getAllCharacters: function() {
    return [
      { _id: '1', type: 'Rat',   damage: '1', melee: 'true', hp: '2'},
      { _id: '2', type: 'Snake', damage: '2', melee: 'true', hp: '3'}
    ];
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
  }

});

module.exports = CharStore;
