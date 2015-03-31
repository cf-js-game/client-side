'use strict';

var PaperDoll = require('./PaperDoll');
var FitItem = require('./FitItem');
var Class = require('./CharClass');
var statCalc = require('./statCalc');

function Character (owner, name) {
  this._id = '';
  this.owner = owner;
  this.name = name;
  this.inventory = [];
  this.paperDoll = new PaperDoll();

  this.maxHP = 20;
  this.regenHP = 0.6;

  this.maxMP = 10;
  this.regenMP = 0.9;

  this.currentHP = 20;
  this.currentMP = 20;

  this.speed = 2;
  this.range = 1;

  this.str = 1;
  this.dex = 1;
  this.vit = 0;
  this.ene = 0;

  this.damage = 1;
  this.armor = 0;

  this.xpPercent = 0;
  this.xp = 0;
  this.level = 1;

  this.enemiesKilled = 0;
}

Character.prototype.pickupItem = function(item) {
  this.inventory.push(item);
};

Character.prototype.dropItem = function(itemIndex) {
  return this.inventory.splice(itemIndex, 1)[0];
};

Character.prototype.dequip = function(slot) {
  if (this.paperDoll[slot]) {
    this.inventory.push(this.paperDoll[slot]);
    this.paperDoll[slot] = '';
    statCalc(this);
  }
};

Character.prototype.equip = function(item) {
  if (this.paperDoll[item.slot]) {
    this.inventory.push(this.paperDoll[item.slot]);
    this.paperDoll[item.slot] = '';
  }

  if (item.slot === 'mainHand' || item.slot === 'offHand') {
    // Dequip twoHand
    if (this.paperDoll.twoHand) {
      this.inventory.push(this.paperDoll.twoHand);
      this.paperDoll.twoHand = '';
    }

    this.paperDoll[item.slot] = item;
    statCalc(this);

    return;
  }

  if (item.slot === 'twoHand') {
    // Dequip mainHand
    if (this.paperDoll.mainHand) {
      this.inventory.push(this.paperDoll.mainHand);
      this.paperDoll.mainHand = '';
    }

    // Dequip offHand
    if (this.paperDoll.offHand) {
      this.inventory.push(this.paperDoll.offHand);
      this.paperDoll.offHand = '';
    }

    this.paperDoll[item.slot] = item;
    statCalc(this);

    return;
  }

  this.paperDoll[item.slot] = item;
  statCalc(this);
};

/**
 * [xpCalc determines xp gained per kill and propagates level-ups]
 */
Character.prototype.xpCalc = function() {
  var lvlXP = 2000000; // xp required to level up: 2,000,000
  var mxp = 1000000; // monster xp: 1,000,000

  // Balanced for levels 1 - 100
  this.xp += Math.floor(mxp / ((Math.sqrt(this.level) * this.level) / 5 +
             Math.sqrt(this.level) + Math.exp(this.level / 22)));

  // Level UP!
  if (this.xp >= lvlXP) {
    this.xp = this.xp - lvlXP;
    this.xpPercent = (this.xp / lvlXP).toFixed(2).toString();
    this.level += 1;
    statCalc(this);
    return;
  }

  this.xpPercent = (this.xp / lvlXP).toFixed(2).toString();
};

/**
 * [takeDamage: Call when hit; pass in damage from monster. currentHP update]
 * @param  {[Int]} dmg [monster damage]
 */
Character.prototype.takeDamage = function(dmg) {
  // Balanced for levels 1 - 100
  this.currentHP -= dmg - (dmg * ((this.armor / 3) / 100));
};

module.exports = Character;
