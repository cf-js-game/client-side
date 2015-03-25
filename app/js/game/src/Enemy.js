'use strict';


var newMonster = function(){
  return {
    _random: function() {
      return Math.floor(Math.random() * 3);
    },
    _switch: function(){
      var random = this._random();
      return random === 0 ? 'Rat': random === 1 ? 'Skeleton' : 'Slime';
    }
  };
};

module.exports = newMonster();

function Enemy() {
	this.hp;
}

Enemy.prototype.init = function(playerLevel) {
	this.hp = playerLevel * 0.7;
};

