'use strict';

var GameStart = require('./game/main');

// create container node for canvas/game
var pNode = document.createElement('div');
pNode.setAttribute('id', 'game')

// identify our build definition so we can insert the canvas/game before it
var script = document.getElementsByTagName('script')[0];
document.getElementsByTagName('body')[0].insertBefore(pNode, script);


window.addEventListener('load', GameStart);