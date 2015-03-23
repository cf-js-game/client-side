'use strict';

require('./PaperDoll');


function Character(owner, name) {
	this.owner = owner || 'not set';
	this.name = name || 'not set';
	this.inventory = [];
	this.equipped = new PaperDoll();
	this.baseHP = 10;
	this.baseMana = 10;
}

module.exports = Character;

