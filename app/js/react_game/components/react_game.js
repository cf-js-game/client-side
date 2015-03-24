'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;


var GameStart = require('../../game/main');
require('craftyjs');

var GameComponent = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    GameStart();
  },

  render: function() {

    console.log("react_game  render");
    // var gameElement = getElementById('game');
    // gameElement.addEventListener('load', GameStart);

    return (
      <div id="game">
      </div>
    )
  }
});

module.exports = GameComponent;

// GameStart();

//  id = "cr-stage"
// <html>
//   <head></head>
//   <body>
//     <div id="game"></div>
//     <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
//     <script>
//       Crafty.init(500,350, document.getElementById('game'));
//     </script>
//   </body>
// </html>

