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
    for (var i=0; i < this.props.data.charList.length; i++) {
      if (this.props.data.selectedCharId === this.props.data.charList[i]._id) {
        selectedCharIndex = i;
      }
    }
    var pObj = this.props.data.charList[selectedCharIndex];
    console.log('about to start game with: ');
    for ( var k in pObj) {
      console.log(k, pObj[k]);
    }
    GameStart(this.props.data.charList[selectedCharIndex]);

  },

  render: function() {
    return (
      <div id='cr-stage'></div>
    );
  }
});

module.exports = GameComponent;


