'use strict';

var mongoose = require('mongoose');

var monsterQSchema = new mongoose.Schema({
  owner: {type: String, default: 'rat'},
  hp: {type: String, default: '1'}
});

module.exports = mongoose.module('MonsterQ', monsterQSchema);
