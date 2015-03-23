'use strict';

var Game = require('../game');

var directions = {
  card: [
    'n',
    'ne',
    'e',
    'se',
    's',
    'sw',
    'w',
    'nw'
  ],
  roll: function() {
    return Math.floor(Math.random() * 8);
  }
};


Crafty.sprite(32, 'js/game/assets/rock.png', {
  rock: [0, 0]
});
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
 

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Hero, Actor, Fourway, Color, Collision, Animate')
      .attr({w: 16, h: 16,})
      .color('#1122ff')
      .fourway(4)
      .collision()
      .bind('Moved', function(old) {
        if (this.hit('Solid')) {
          this.x = old.x;
          this.y = old.y;
        }
      })
      .onHit('Item', this.visitItem)
      .onHit('EnemyNPC', this.hitEnemy);
  },
  visitItem: function(data) {
    var item = data[0].obj;
    item.collect();
    console.log('Item Visited: ' + data);
  },
  hitEnemy: function(data) {
    var enemy = data[0].obj;
    enemy.kill();
    console.log('Killed enemy.');
  }
});

Crafty.c('EnemyNPC', {
  init: function() {
    this.requires('Actor, Color, Collision')
      .attr({w: 16, h: 16})
      .color('#ff0000')
      .collision();
  },
  kill: function() {
    this.destroy();
  }
});

Crafty.c('FollowAI', {
  followAI: function(obj) {
    this.bind('EnterFrame', function(obj) {
      if ((this.x < (obj.x + 100)) || (this.y < (obj.y + 100))) {
        this.x += this._speed;
      }
    });
  }
});


Crafty.c('AI', {

});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('#808080');
  }
});

Crafty.c('ExitPoint', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('#8B00AD');
  }
});

Crafty.c('StaticSprite', {
  init: function() {
    this.requires('Actor, Solid, rock');
  }
});

Crafty.c('Floor', {
  init: function() {
    this.requires('Actor, Color')
      .color('#222222');
  }
});

Crafty.c('Item', {
  init: function() {
    this.requires('Actor, Color')
      .attr({w: 4, h: 4,})
      .color('#ff0033');
  },
 
  collect: function() {
    this.destroy();
  }
});

Crafty.c('FitItem', {
  init: function() {
    this.requires('Actor, Color')
      .attr({w: 4, h: 4,})
      .color('#ff0033');
  },
 
  collect: function() {
    this.destroy();
  }
});

