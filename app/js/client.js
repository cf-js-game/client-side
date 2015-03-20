'use strict';

require('craftyjs');

// create container node for canvas/game
var pNode = document.createElement('div');
pNode.setAttribute('id', 'game')

// identify our build definition so we can insert the canvas/game before it
var script = document.getElementsByTagName('script')[0];
document.getElementsByTagName('body')[0].insertBefore(pNode, script);

// Crafty Specifics
Crafty.init(500, 500, document.getElementById('game'));

Crafty.background('#000000');

Crafty.e('2D, Canvas, Color, Fourway')
	.attr({x: 10, y: 10, w: 20, h: 20})
	.color('#00ff00')
	.fourway(4);