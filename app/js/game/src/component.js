'use strict';

var Game = require('../game');
var Item = require('./item')();
var util = require('./util');
var charUpdate = Game.charUpdate;

var Map = require('./map');


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
    return Math.floor(Math.random() * 8);
  }
};

Crafty.extend({
    randChance: function(a, b) {
        return Crafty.randRange(0, b) > b - a;
    },
    rInt: function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    rFlt: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    rSign: function(){
      if(this.rInt(0,1) === 1){
        return 1;
      }else{
        return -1;
      }
    }
});

Crafty.sprite(32, 'js/game/assets/rock.png', {
  rock: [0, 0]
});

Crafty.sprite(32, 'js/game/assets/single_chest.png', {
  spChest: [0, 0]
});

Crafty.sprite(16, 'js/game/assets/link.png', {
  playerSprite: [0, 0]
});

Crafty.sprite(32, 'js/game/assets/boundary.png', {
  boundary: [0, 0]
});

Crafty.sprite(32, 'js/game/assets/water.png', {
  water: [0, 0]
});

Crafty.sprite(32, 'js/game/assets/dirt.png', {
  dirt: [0, 0]
});

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
    this.requires('Actor, Multiway, Color, Collision, Animate, playerSprite')
      .attr()
      .origin('center')
      .collision()
      .multiway(this.details.speed, {W: 270, S: 90, D: 0, A: 180})
      .bind('Moved', function(old) {
        if (this.hit('Solid')) {
          this.x = old.x;
          this.y = old.y;
        }
      })
      .bind('NewDirection', function(direction){
        var now = direction
        if(direction.x === 0){
          if(direction.y === 0){
            return;
          }else if(direction.y > 0){
            this.rotation = 180;
          }else if(direction.y < 0){
            this.rotation = 0;
          }

        }else if(direction.x > 0){
          if(direction.y === 0){
            this.rotation = 90;
          }else if(direction.y > 0){
            this.rotation = 135;
          }else if(direction.y < 0){
            this.rotation = 45;
          }
        }else if(direction.x < 0){
          if(direction.y === 0){
            this.rotation = 270;
          }else if(direction.y > 0){
            this.rotation = 225;
          }else if(direction.y < 0){
            this.rotation = 315;
          }
        }
      })
      .onHit('Item', this.visitItem)
      .onHit('Rat', this.hitEnemy)
      .onHit('Skeleton', this.hitEnemy)
      .onHit('Slime', this.hitEnemy)
      .onHit('cItem', this.visitItem)
      .onHit('ExitPoint', function() {
        util.gameLogUpdate('You go deeper.');
        Crafty.scene('main');
      });
  },
  visitItem: function(data) {
    var item = data[0].obj;
    this.details.pickupItem(item.stats);
    item.collect();
    charUpdate.emit('characterUpdate', this.details);
    util.gameLogUpdate('You have picked up ' + item.stats.name);
  },
  hitEnemy: function(data) {
    var enemy = data[0].obj;
    this.details.enemiesKilled++;
    enemy.kill(this.details.level);
    charUpdate.emit('characterUpdate', this.details);
    util.gameLogUpdate('They didn\'t suffer.');
  },
  currPos: function(){
    return ([pTA(curr._x), pTA(curr._y)]);
  },
  details: Game.player
});

Crafty.c('Rat', {
  init: function() {
    this.requires('Actor, Color, Collision, Delay')
      .attr({
        w: 16,
        h: 16,
      })
      .color('#A31E00')
      .collision()
      .bind('Moved', function(old){
        if (this.hit('Solid')) {
          his.movement = false;
          this.speed = false;
          this.x = old.x;
          this.y = old.y;
        }
      });
  },
  kill: function(charLevel) {
    this.killedBy = charLevel;
    this.trigger('NPCDeath');
    this.destroy();
  },
  changeDirection: function() {
  },
  moveSome: function() {
    this.move(this.direction, 0.2);
  },
  track: function(){

  }
});

Crafty.c('Skeleton', {
  speed: 0.1,
  init: function() {
    this.requires('Actor, Color, Collision, Delay')
      .attr({w: 16, h: 16})
      .origin('center')
      .color('#E6E6E6')
      .collision()
      .bind('Moved', function(old) {
        if (this.hit('Solid')) {
          this.movement = false;
          this.speed = false;
          this.x = old.x;
          this.y = old.y;
        }
      });
  },
  kill: function(charLevel) {
    this.killedBy = charLevel;
    this.trigger('NPCDeath');
    this.destroy();
  },
  changeDirection: function() {
  },
  moveSome: function() {
    this.move(this.direction, 0.2);
  }
});

Crafty.c('Slime', {
  speed: 0.2,
  init: function() {
    this.requires('Actor, Color, Collision, Delay')
      .attr({w: 16, h: 16})
      .origin('center')
      .color('#19A347')
      .collision()
      .bind('Moved', function(old) {
        if (this.hit('Solid')) {
          this.movement = false;
          this.speed = false;
          this.x = old.x;
          this.y = old.y;
        }
      });
  },
  kill: function(charLevel) {
    this.killedBy = charLevel;
    this.trigger('NPCDeath');
    this.destroy();
  },
  changeDirection: function() {
  },
  moveSome: function() {
    this.move(this.direction, 0.2);
  }
});

Crafty.c('EnemyNPC', {
  speed: 0.2,
  init: function() {
    this.requires('Actor, Color, Collision, Custom, Animate')
      .attr({w: 16, h: 16})
      .color('#A31E00')
      .collision()
      .bind('Moved', function(old) {
        if (this.hit('Rock')) {
          this.x = old.x;
          this.y = old.y;
        }
      });
  },
  kill: function(charLevel) {
    this.killedBy = charLevel;
    this.trigger('NPCDeath');
    this.destroy();
  },
  changeDirection: function() {
  },
  moveSome: function() {
    this.move(this.direction, 0.2);
  }
});

Crafty.c('Attack', {
  melee: function(range) {
    this.bind('EnterFrame', function(obj) {
      Pathing(Map.tileMap, [this.x, this.y], [heroArr]);
    })
  }
});

Crafty.c('LevelBounds', {
  init: function() {
    this.requires('Actor, Color, Solid, boundary')
      .color('#808080');
  }
});

Crafty.c('ExitPoint', {
  init: function() {
    this.requires('Actor, Color')
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
    this.requires('Actor, Color, dirt')
      .color('#222222');
  }
});

Crafty.c('Water', {
  init: function() {
    this.requires('Actor, Color, Collision, water')
      .color('#222222');
  }
});

Crafty.c('Chest', {
  init: function() {
    this.requires('Actor, spChest');
  }
});

Crafty.c('cItem', {
  stats: '',
  init: function() {
    this.requires('Actor, Color')
      .attr({w: 4, h: 4,})
      .color('#ff0033');
  },
  collect: function() {
    this.destroy();
  },
  initStats: function(charLevel, mod) {
    this.stats = Item.spawn(charLevel, mod);
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

