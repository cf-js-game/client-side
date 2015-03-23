'use strict';

require('./FitItem')

function PaperDoll() {
	this.helmet = ''; // Head
	this.pauldrons = ''; // Shoulders
	this.cuirass = ''; // Chest
	this.greaves = ''; // Legs
	this.boots = ''; // Feet
	this.amulet = ''; // Neck
	this.ring = '';

	this.mainHand = '';
	this.OffHand = '';
	this.twoHand = '';
}

module.exports = PaperDoll;
