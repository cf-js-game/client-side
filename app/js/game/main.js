'use strict';

require('craftyjs');
var Game = require('./game')
var TileMap = require('./src/map');
require('./src/component');

var viewport = {
	w: 1200,
	h: 800
};

var directions = {
  card: [
    'n',
    'ne',
    'e',
    'se',
    's',
    'sw',
    'w',
    'nw',
    'stop'
  ],
  roll: function() {
    return Math.floor(Math.random() * 9);
  }
};


Game.start = function () {

	Crafty.init();

	Crafty.defineScene('main', function () {

		Crafty.viewport.init(viewport.w, viewport.h);
		Crafty.background('#000');
		
		Crafty.viewport._clamp();
		Crafty.viewport.clampToEntities = false;
		
		//Generate Map
		TileMap.generateBlob();
		
    var enemies = [];
		// Place All Entities
		for (var y = 0; y < Game.map_grid.width; y++) {
			for (var x= 0; x < Game.map_grid.height; x++) {
				var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

				if (at_edge) {
					Crafty.e('Rock').at(x, y);
				} else if (TileMap.tileMap[x][y] === 0) {
					Crafty.e('Rock').at(x, y);
				} else if (TileMap.tileMap[x][y] === 1) {
					Crafty.e('Floor').at(x, y);
				} else if (TileMap.tileMap[x][y] === 2) {
					Crafty.e('Floor').at(x, y);
					Crafty.e('StaticSprite').at(x, y);
				} else if (TileMap.tileMap[x][y] === 3) {
					Crafty.e('Floor').at(x, y);
					enemies.push(Crafty.e('EnemyNPC').at(x, y));
				} else if (TileMap.tileMap[x][y] === 5) {
					Crafty.e('Water').at(x, y);
				}
			}
		}

		// Movement on Enter Frame
		enemies.forEach(function(e) {
			e.bind('EnterFrame', function() {
				this.move('n', 0.2);
				// var that = this;
				// function loop() {
		  //     var time = Math.floor(Math.random() * (5000 - 2000) + 2000);
		  //     setTimeout(function() {
		  //       var dirS = 'n';
		  //       that.direction = 'n';
		  //       if (dirS === 'stop') {
		  //         that.speed = 0;
		  //       } else {
		  //         that.direction = dirS;
		  //         that.speed = 0.2;
		  //       }
		  //       that.move(that.direction, that.speed);
		  //     }, 2000);
		  //     loop();
			 //  }
			});
		});

    // Place Exit
    Crafty.e('ExitPoint').at(TileMap.farthestFromOrigin[0], TileMap.farthestFromOrigin[1]);

    // Create Player Entity 
    var hero = Crafty.e('PlayerCharacter').at(250, 250);
    Crafty.viewport.follow(hero, 0, 0);

    console.log(Crafty.frame());
  });

	Crafty.defineScene('init', function() {
		Crafty.viewport.init(viewport.w, viewport.h);
		Crafty.background('#000');
		
		Crafty.e('2D, Canvas, Mouse, HTML')
			.attr({x: viewport.w/2, y: viewport.h/2, h: 30, w: 100})
			.append("<button>Enter the depths.</button>")
			.bind('Click', function() {
				Crafty.scene('main');
			});
	});	

	Crafty.scene('init');
}


module.exports = Game.start;




