'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

//var io = require('socket.io');

var CharDetails = React.createClass({
  mixins: [FluxMixin],
  // getInitialState: function(charIdentifier) {
  //   // pcharIdentifier = { _id: "1" }

  //   var characters = this.getFlux().actions.getState();

  //   return characters[index];
  //   // return {charDetails:
  //   //   { _id: '1', type: 'Rat', damage: '1', melee: 'true', hp: '2'}
  //   // };
  // },

  componentDidMount: function(){

      // -------------------
      //  add socket io
      // -------------------
      // from http://socket.io/get-started/chat/
      // Notice that I’m not specifying any URL when I call
      // ...io(), since it defaults to trying to connect to the
      // ...host that serves the page.

      //var socket = io();

      // send message to server

      //socket.emit('char stats', 'Godzilla hp = 200');

      // $('form').submit(function(){
      //   socket.emit('chat message', $('#m').val());
      //   $('#m').val('');
      //   return false;
      // });

      // receive message sent from server
      // socket.on('char stats2', function(msg){
      //   console.log("msg = " + msg);
      //   var abc = document.getElementById('steph');
      //   abc.innerHTML += msg;
      // });

      // -------end of add socket io------------

  },

  handleSubmit: function(event) {
    event.preventDefault();

    // JSON.stringify(this.state.character?)
    //socket.emit('char stats', 'Godzilla hp = 200');

  },

  render: function() {
    //  data={"1"} is passed in
    //<CharDetails data={this.state} setFlag={this.setFlag}/>

    return (<div id='char-detail'>
              <h3>{this.props.data.name}</h3>
              <ul>
                <li>Inventory: {this.props.data.invArray}</li>
                <li>Paper Doll: {this.props.data.paperDoll}</li>
                <li>Hit Point: {this.props.data.baseHP}</li>
                <li>Mana: {this.props.data.baseMana}</li>
                <li>Strength: {this.props.data.baseStr}</li>
                <li>Dex: {this.props.data.baseDex}</li>
                <li>Vitality: {this.props.data.baseVit}</li>
                <li>Energy: {this.props.data.baseEne}</li>
              </ul>
              <div id='status-updates'>
              </div>
              <div id='steph'>
              </div>
          </div>
        );
  }

});

module.exports = CharDetails;
