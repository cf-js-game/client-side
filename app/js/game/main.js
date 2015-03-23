'use strict';

require('craftyjs');
var Game = require('./game')
var TileMap = require('./src/map');
require('./src/component');

	
Game.start = function () {

	Crafty.init();

	TileMap.generateBlob();

	Crafty.defineScene('main', function () {

		Crafty.viewport.init(1200, 800);
		Crafty.background('#000');
		
	    Crafty.viewport._clamp();
		Crafty.viewport.clampToEntities = false;


	    for (var y = 0; y < Game.map_grid.width; y++) {
	      for (var x= 0; x < Game.map_grid.height; x++) {
	        var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
	 
	        if (at_edge) {
	          Crafty.e('Rock').at(x, y);
	        } else if (TileMap.tileMap[x][y] === 0) {
	          Crafty.e('Rock').at(x, y);
	        } else if (TileMap.tileMap[x][y] === 1) {
	        	Crafty.e('Floor').at(x, y);
	        }

	      }
	    }
	    console.log('map created');

	    var max_items = 400;
	    for (var x = 20; x < Game.map_grid.width-20; x++) {
	      for (var y = 20; y < Game.map_grid.height-20; y++) {
	      	if (TileMap.tileMap[x][y] === 1) {
	      		if (Math.random() < 0.01) {
		          Crafty.e('Item').at(x, y);
		 
		          if (Crafty('Item').length >= max_items) {
		            return;
		          }
		        }	
	      	}
	        
	      }
	    }
	    console.log('items placed');



	    for (var x = 20; x < Game.map_grid.width-20; x++) {
	      for (var y = 20; y < Game.map_grid.height-20; y++) {
	      	if (TileMap.tileMap[x][y] === 1) {
	      		if (Math.random() < 0.01) {
		          Crafty.e('EnemyNPC').at(x, y);
		 
		        }	
	      	}
	      }
	    }

	    // Place Exit
	    Crafty.e('ExitPoint').at(TileMap.farthestFromOrigin[0], TileMap.farthestFromOrigin[1]);

		var hero = Crafty.e('PlayerCharacter').at(250, 250); 
	    Crafty.viewport.follow(hero, 0, 0);
	});

	Crafty.defineScene('loading', function() {

	});	

	Crafty.scene('main');
}


module.exports = Game.start;




