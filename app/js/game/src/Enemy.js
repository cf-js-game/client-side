'use strict';

function Enemy() {
	this.hp;
}

Enemy.prototype.init = function(playerLevel) {
	this.hp = playerLevel * 0.7;
};