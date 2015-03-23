'use strict';

var Game = require('../game');

// Tile Map Key
// -1 - 0: An impassable entity, used for map bounds ( Collidable Entities )
// 1: Passable area


// 1 N
// 2 NE
// 3 E
// 4 SE
// 5 4S
// 6 SW
// 7 W
// 8 NW

module.exports = {

	tileMap: [],
	initMap: function() {
		for (var i = 0; i < this.w; i++) {
			this.tileMap[i] = [];
			for ( var j = 0; j < this.h; j++) {
				this.tileMap[i][j] = 0;
			}
		}
	},
	w: Game.map_grid.width,
	h: Game.map_grid.height,
	directions: {
		N: {
			x: 0,
			y: -1
		},
		E: {
			x: 1,
			y: 0
		},
		S: {
			x: 0,
			y: 1
		},
		W: {
			x: -1,
			y: 0
		}
	},
	farthestFromOrigin: [],
	generateBlob: function () {
		console.log('starting map generation');
		this.initMap();

		var iterations = Game.map_grid.iterations() || 16000;
		var curPos = {x: this.w / 2, y: this.h / 2};

		while (iterations--) {

			var at_edge = curPos.x == 0 || curPos.x == this.w - 1 || curPos.y == 0 || curPos.y == this.h - 1;
			if (at_edge) {
				curPos.x = this.w / 2;
				curPos.y = this.h /2;
			}

			this.tileMap[curPos.y][curPos.x] = 1;
			var nextDir = cardRand();
			if (nextDir === 1) {
				curPos.y += this.directions.N.y;
				curPos.x += this.directions.N.x;
			}
			if (nextDir === 2) {
				curPos.y += this.directions.E.y;
				curPos.x += this.directions.E.x;
			}
			if (nextDir === 3) {
				curPos.y += this.directions.S.y;
				curPos.x += this.directions.S.x;
			}
			if (nextDir === 4) {
				curPos.y += this.directions.W.y;
				curPos.x += this.directions.W.x;
			}
		}

		// check/clean
		for (var y = 1; y < this.h-1; y++) {
			for (var x = 1; x < this.w-1; x++) {
				if ((this.tileMap[y][x] === 0  || this.tileMap[y][x] === -1)
					&& (this.tileMap[y+1][x] === 0 || this.tileMap[y+1][x] === -1)
					&& (this.tileMap[y-1][x] === 0 || this.tileMap[y-1][x] === -1)
					&& (this.tileMap[y+1][x+1] === 0 || this.tileMap[y+1][x+1] === -1)
					&& (this.tileMap[y][x+1] === 0 || this.tileMap[y][x+1] === -1)
					&& (this.tileMap[y-1][x+1] === 0 || this.tileMap[y-1][x+1] === -1)
					&& (this.tileMap[y-1][x-1] === 0 || this.tileMap[y-1][x-1] === -1)
					&& (this.tileMap[y][x-1] === 0 || this.tileMap[y][x-1] === -1)
					&& (this.tileMap[y+1][x-1] === 0 || this.tileMap[y+1][x-1] === -1))
					this.tileMap[y][x] = -1;
			}
		}

		function cartDist(x1, x2, y1, y2) {
			return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
		}

		// Determine farthest point in map from origin
		var coordsOfMap = [];
		var origin = [250, 250];
		var farthestPoint = [250, 250];
		for (var y = 0; y < this.h; y++) {
			for (var x = 0; x < this.w; x++) {
				if (this.tileMap[y][x] === 1) {
					coordsOfMap.push([y, x]);
				}
			}
		}

		for (var i = 0; i < coordsOfMap.length; i++) {
			if (cartDist(origin[0], origin[1], coordsOfMap[i][0], coordsOfMap[i][1])
				> cartDist(origin[0], origin[1], farthestPoint[0], farthestPoint[1])) {

				farthestPoint[0] = coordsOfMap[i][0];
				farthestPoint[1] = coordsOfMap[i][1];
			}
		}
		this.farthestFromOrigin[0] = farthestPoint[0];
		this.farthestFromOrigin[1] = farthestPoint[1];


		// Starting Point
		this.tileMap[this.h / 2][this.w / 2] = 1;
		console.log('Map gen complete');
	}
};

function cardRand() {
	return Math.floor((Math.random() * 4) + 1);
}

function rand() {
	return Math.random();
}


