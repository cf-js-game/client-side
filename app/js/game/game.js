'use stict';

var Game = {
	map_grid: {
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
		return this.map_grid.width * this.map_grid.tile.width;
	},
	height: function () {
		return this.map_grid.height * this.map_grid.tile.height
	}
}

module.exports = Game;