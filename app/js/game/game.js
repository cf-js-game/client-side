'use stict';

var Character = require('./src/Character');

var EventEmitter = require('events').EventEmitter;

var charUpdate = new EventEmitter();

var Game = {
	grid: {
		width: 500,
		height: 500,
		tile: {
			width: 32,
			height: 32
		},
		iterations: function() {
			return Math.floor(Math.random() * 32000 + 4000);
		}
	},
	width: function () {
		return this.grid.width * this.grid.tile.width;
	},
	height: function () {
		return this.grid.height * this.grid.tile.height;
	},
	player: new Character(),
	createNPC: function() {
		return new Character();
	},
	charUpdate: charUpdate
	
};

module.exports = Game;