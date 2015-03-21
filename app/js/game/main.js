'use strict';

require('craftyjs');
var Game = require('./game')
var TileMap = require('./src/map');
require('./src/component');

	
Game.start = function () {

	Crafty.init();

	TileMap.generateBlob();
	console.log(TileMap.tileMap);
	Crafty.scene('main', function () {

		Crafty.viewport.init(1000, 700);
		Crafty.background('#000');
		var hero = Crafty.e('PlayerCharacter').at(250, 50);

	    Crafty.viewport.follow(hero, -60, 0);
	    Crafty.viewport._clamp();
		Crafty.viewport.clampToEntities = false;

		// Place a tree at every edge square on our grid of 16x16 tiles
	    for (var y = 0; y < Game.map_grid.width; y++) {
	      for (var x= 0; x < Game.map_grid.height; x++) {
	        var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
	 
	        if (at_edge) {
	          Crafty.e('Rock').at(x, y);
	        } else if (TileMap.tileMap[x][y] === 1) {
	          Crafty.e('Rock').at(x, y);
	        } else if (Math.random() < 0.04) {
	        	Crafty.e('Bush').at(x, y);
	        }
	      }
	    }

	    // Generate up to five villages on the map in random locations
	    var max_villages = 400;
	    for (var x = 20; x < Game.map_grid.width-20; x++) {
	      for (var y = 20; y < Game.map_grid.height-20; y++) {
	        if (Math.random() < 0.003) {
	          Crafty.e('Item').at(x, y);
	 
	          if (Crafty('Item').length >= max_villages) {
	            return;
	          }
	        }
	      }
	    }
	});
	
	Crafty.scene('main');
	
    
}


module.exports = Game.start;




