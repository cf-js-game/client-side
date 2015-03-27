'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GameStart = require('../../game/main');
//require('craftyjs');

var GameComponent = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    GameStart();
  },

  render: function() {
    return (
      <div id='cr-stage'></div>
    );
  }
});

module.exports = GameComponent;


