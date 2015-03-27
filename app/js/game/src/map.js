'use strict';

var Game = require('../game');

// Tile Map Key
// -1 - 0: An impassable entity, used for map bounds ( Collidable Entities )
// 1: Passable area
// 2: Rocks
// 3: Monster Locations
// 4: Mob Spawn
// 5: Water
// 6: Chest


// 1 N
// 2 NE
// 3 E
// 4 SE
// 5 4S
// 6 SW
// 7 W
// 8 NW

var map = {

	tileMap: [],
	initMap: function() {
		for (var i = 0; i < this.h; i++) {
			this.tileMap[i] = [];
			for ( var j = 0; j < this.w; j++) {
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
				curPos.y = this.h / 2;
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

		// Monster Spawn : 3
		chanceApplyToCoord(coordsOfMap, this.tileMap, 0.01, 3);

		// Chest Locations : 6
		chanceApplyToCoord(coordsOfMap, this.tileMap, 0.0006, 6);

		//Rock Locations : 2
		checkAndChanceApply(coordsOfMap, this.tileMap, 0.03, 1, 2);

		// Water Locations : 5
		for (var i = 0; i < coordsOfMap.length; i++) {
			if (rand() < 0.009) {

				this.tileMap[coordsOfMap[i][0]][coordsOfMap[i][1]] = 5;
				var curPos = {y: coordsOfMap[i][0], x: coordsOfMap[i][1]};
				var iterations = Math.floor(Math.random() * (111 - 50) + 50);
				while (iterations--) {
					this.tileMap[curPos.y][curPos.x] = 5;
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

					if (this.tileMap[curPos.y][curPos.x] !== 1) {
						iterations = 0;
					}
				}
			}
		}

		// Starting Point
		this.tileMap[this.h / 2][this.w / 2] = 1;
	}
};

function cartDist(x1, x2, y1, y2) {
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function cardRand() {
	return Math.floor((Math.random() * 4) + 1);
}

function rand() {
	return Math.random();
}

function checkAndChanceApply(mapCoords, applyToTileMap, chance, checkTile, applyTile) {
	for ( var i = 0; i < mapCoords.length; i++ ) {
		if (rand() < chance) {
			if(checkSurrounding(mapCoords[i][0], mapCoords[i][1], applyToTileMap, checkTile)) {
				applyToTileMap[mapCoords[i][0]][mapCoords[i][1]] = applyTile;
			}
		}
	}
}

function chanceApplyToCoord(mapCoords, applyToTileMap, chance, applyTile) {
	for ( var i = 0; i < mapCoords.length; i++ ) {
		if (rand() < chance) {
				applyToTileMap[mapCoords[i][0]][mapCoords[i][1]] = applyTile;
		}
	}
}

function checkSurrounding(y, x, tileMap, tileType) {
			
	if ((tileMap[y+1][x] === tileType)
			&& (tileMap[y-1][x] === tileType)
			&& (tileMap[y+1][x+1] === tileType)
			&& (tileMap[y][x+1] === tileType)
			&& (tileMap[y-1][x+1] === tileType)
			&& (tileMap[y-1][x-1] === tileType)
			&& (tileMap[y][x-1] === tileType)
			&& (tileMap[y+1][x-1] === tileType)) {
		return true;
	}
	return false;
}

function checkSurroundingLoose(y, x, tileMap, tileType) {
			
	if ((tileMap[y+1][x] === tileType)
			|| (tileMap[y-1][x] === tileType)
			|| (tileMap[y+1][x+1] === tileType)
			|| (tileMap[y][x+1] === tileType)
			|| (tileMap[y-1][x+1] === tileType)
			|| (tileMap[y-1][x-1] === tileType)
			|| (tileMap[y][x-1] === tileType)
			|| (tileMap[y+1][x-1] === tileType)) {
		return true;
	}
	return false;
}

module.exports = map;