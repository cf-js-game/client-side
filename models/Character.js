'use strict';

var mongoose = require('mongoose');

var equiped = {
  "helmet": "",
  "pauldrons": "",
  "cuirass": "",
  "gauntlets": "",
  "greaves": "",
  "boots": "",
  "amulet": "",
  "ring": "",
  "mainHand": "",
  "offHand": "",
  "twoHand": ""
};

var characterSchema = new mongoose.Schema({
  owner: {type: String, required: true},
  name: {type: String, required: true},
  inventory: {type: Array, default: []},
  paperDoll: {type: String, default: equiped},
  str: {type: Number, default: 1},
  dex: {type: Number, default: 1},
  vit: {type: Number, default: 0},
  ene: {type: Number, default: 0},
  maxHP: {type: Number, default: 20},
  maxMP: {type: Number, default: 20},
  regenHP: {type: Number, default: 0.6},
  regenMP: {type: Number, default: 0.9},
  range: {type: Number, default: 1},
  damage: {type: Number, default: 1},
  armor: {type: Number, default: 0},
  speed: {type: Number, default: 2},
  xp: {type: Number, default: 0},
  level: {type: Number, default: 1},
  currentHP: {type: Number, default: 20},
  currentMP: {type: Number, default: 20},
  enemiesKilled: {type: Number, default: 0}
});

characterSchema.methods.dequip = function(slot) {
  if (this.paperDoll[slot]) {
    this.inventory.push(this.paperDoll[slot]);
    this.paperDoll[slot] = "";
  }
};

characterSchema.methods.equip = function(item) {
  this.dequip(item.slot);

  if (item.slot === 'mainHand' || item.slot === 'offHand') {
    this.dequip('twoHand');
    this.paperDoll[item.slot] = item;

    return;
  }

  if (item.slot === 'twoHand') {
    this.dequip('mainHand');
    this.dequip('offHand');
    this.paperDoll[item.slot] = item;

    return;
  }

  this.paperDoll[item.slot] = item;
};

module.exports = mongoose.model('Character', characterSchema);
