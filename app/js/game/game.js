'use stict';

var Game = {
	map_grid: {
		width: 500,
		height: 500,
		tile: {
			width: 16,
			height: 16
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