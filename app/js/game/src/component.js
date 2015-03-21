'use strict';

var Game = require('../game');

// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});
 
// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Hero, Actor, 2D, Fourway, Color, Collision')
      .attr({w: 10, h: 10})
      .fourway(4)
      .color('#1122ff')
      .stopOnSolids()
      .onHit('Item', this.visitItem);
  },
 
  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
 
    return this;
  },
 
  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  visitItem: function(data) {
    var item = data[0].obj;
    item.collect();
    console.log('Item Visited: ' + data);
  }
});

Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 125, 40)');
  },
});

Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 185, 40)');
  },
});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('#808080');
  },
});


Crafty.c('Item', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(170, 125, 40)');
  },
 
  collect: function() {
    this.destroy();
  }
});

