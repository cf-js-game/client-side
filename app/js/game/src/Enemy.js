'use strict';

var Monster = {
  _random: function() {
    return Math.floor(Math.random() * 3);
  },
  _getName: function(){
    var random = this._random();
    return random === 0 ? 'Rat': random === 1 ? 'Skeleton' : 'Slime';
  },
  spawn: function(lvl) {
    var monster = {};
    monster.name = this._getName();
    monster.level = lvl;
    monster.atributes = {
      "damage": Math.floor(2 + lvl * 0.636363),
      "speed": 2 + lvl * 0.020202,
      "hp": Math.floor(10 + lvl * 2.262626),
      "range": 1
    };

    return monster;
  }
};

module.exports = Monster;