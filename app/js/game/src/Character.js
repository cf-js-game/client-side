'use strict';

var PaperDoll = require('./PaperDoll');
var FitItem = require('./FitItem');
var Class = require('./CharClass');

function Character (owner, name) {
	this.owner = owner || 'not set';
	this.name = name || 'not set';
	this.inventory = [];
	this.equipped = new PaperDoll();
	this.baseHP = 10;
	this.regenHP = 0.1;
	this.baseMana = 10;
	this.regenMana = 0.4;
	this.speed = 6;

	this.class = new Class();
	this.xp = 1;
	this.level = this.xp/5;

	this.enemiesKilled = 0;
}

Character.prototype.pickupItem = function(item) {
	this.inventory.push(item);
};

Character.prototype.dropItem = function(itemIndex) {
	return this.inventory.splice(itemIndex, 1)[0];
};

Character.prototype.fitItem = function (item, type) {
	if (typeof item === 'FitItem') {
		this.equipped[type] = item;
	}
};

Character.prototype.getLevel = function() {
	return this.xp/5;
};

module.exports = Character;

