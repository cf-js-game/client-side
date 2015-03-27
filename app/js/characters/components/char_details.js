'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

//var io = require('socket.io');

var charUpdate = require('../../game/game').charUpdate;


var CharDetails = React.createClass({
  mixins: [FluxMixin],
  componentDidMount: function() {
    var that = this;

    charUpdate.on('characterUpdate', function (obj) {
      that.getFlux().actions.updateCharacter(obj);
    });
  },

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
    //var invLength = this.props.data.inventory.length;
    return (<div id='char-detail'>
              <h3>{this.props.data.name}</h3>
              <table id='char-detail-list'>
                <tr><td>Inventory:</td> <td>{this.props.data.inventory.length}</td></tr>
                <tr><td>paperDoll:</td> <td>{this.props.data.paperDoll}</td></tr>
                <tr><td>str:</td> <td>{this.props.data.str}</td></tr>
                <tr><td>dex:</td> <td>{this.props.data.dex}</td></tr>
                <tr><td>vit:</td> <td>{this.props.data.vit}</td></tr>
                <tr><td>ene:</td> <td>{this.props.data.ene}</td></tr>
                <tr><td>maxHP:</td> <td>{this.props.data.maxHP}</td></tr>
                <tr><td>maxMP:</td> <td>{this.props.data.maxMP}</td></tr>
                <tr><td>regenHP:</td> <td>{this.props.data.regenHP}</td></tr>
                <tr><td>regenMP:</td> <td>{this.props.data.regenMP}</td></tr>
                <tr><td>range:</td> <td>{this.props.data.range}</td></tr>
                <tr><td>damage:</td> <td>{this.props.data.damge}</td></tr>
                <tr><td>armor:</td> <td>{this.props.data.armor}</td></tr>
                <tr><td>speed:</td> <td>{this.props.data.speed}</td></tr>
                <tr><td>xp:</td> <td>{this.props.data.xp}</td></tr>
                <tr><td>level:</td> <td>{this.props.data.level}</td></tr>
                <tr><td>currentHP:</td> <td>{this.props.data.currentHP}</td></tr>
                <tr><td>currentMP:</td> <td>{this.props.data.currentMP}</td></tr>
                <tr><td>enemiesKilled:</td> <td>{this.props.data.enemiesKilled}</td></tr>
              </table>
              <div id='status-updates'>
              </div>
              <div id='steph'>
              </div>
          </div>
        );
  }

});

module.exports = CharDetails;
