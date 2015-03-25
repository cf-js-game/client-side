'use strict';

var mongoose = require('mongoose');

var equiped = {
  "helmet": "",
  "pauldrons": "",
  "cuirass": "",
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
  invArray: {type: Array, default: []},
  paperDoll: {type: String, default: equiped},
  baseHP: {type: Number, default: 50},
  baseMana: {type: Number, default: 50},
  baseStr: {type: Number, default: 10},
  baseDex: {type: Number, default: 10},
  baseVit: {type: Number, default: 10},
  baseEne: {type: Number, default: 10}
});

characterSchema.methods.dequip = function(slot) {
  if (this.paperDoll[slot]) {
    this.invArray.push(this.paperDoll[slot]);
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

  this.paperdoll[item.slot] = item;
};

module.exports = mongoose.model('Character', characterSchema);
