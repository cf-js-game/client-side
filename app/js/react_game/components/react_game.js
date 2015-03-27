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
    return {

    };
  },

  componentDidMount: function() {
    var selectedCharIndex = 0;
    for (var i=0; i < this.props.charList.length; i++) {
      if (this.props.selectedCharId === this.props.charList[i]._id) {
        selectedCharIndex = i;
      }
    }
    GameStart(this.props.charList[selectedCharIndex]);

  },

  render: function() {
    return (
      <div id='cr-stage'></div>
    );
  }
});

module.exports = GameComponent;


