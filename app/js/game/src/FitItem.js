'use strict';

var Item = require('./item');

function FitItem() {
	this.name = ''
	this.armor = 1;
	this.hp = 1;
	this.mp = 1;
	this.str = 1;
	this.dex = 1;
	this.vit = 1;
	this.ene = 1;
	this.rInit();
}

FitItem.prototype.rInit = function() {
	// Add RNG init function here
};

module.exports = FitItem;