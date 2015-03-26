'use strict';

var PaperDoll = require('./PaperDoll');
var FitItem = require('./FitItem');
var Class = require('./CharClass');

function Character (owner, name) {
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

  this.speed = 1.5;
  this.range = 1;

  this.str = 1;
  this.dex = 1;
  this.vit = 0;
  this.ene = 0;

  this.damage = 1;
  this.armore = 0;

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

Character.prototype.equipItem = function (item, type) {
	if (typeof item === 'FitItem') {
		this.paperDoll[type] = item;
	}
};

Character.prototype.getLevel = function() {
	return this.xp/5;
};

module.exports = Character;

