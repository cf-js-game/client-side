'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;


var GameStart = require('../game/main');
require('craftyjs');

var GameComponent = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {};
  },

  render: function() {

    var gameElement = getElementById('game');
    gameElement.addEventListener('load', GameStart);

    return (
      <div id="game">
      </div>
    )
  }
});

module.exports = GameComponent;

