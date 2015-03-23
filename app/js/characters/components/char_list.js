'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Character = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {characters: [
      { type: 'Rat', damage: '1', melee: 'true', hp: '2'},
      { type: 'Snake', damage: '2', melee: 'true', hp: '3'}
    ]};
  },

  charLinkClick: function(event) {
    event.preventDefault();

    console.log("this.props.data._id");
    console.log(this.props.data._id);
    var charId = this.props.data._id;
    //set flag to control look
    //call action to run CharStore

    this.props.setFlag("showCharacterDetails");

    this.getFlux().actions.selectChar(charId);
  },

  render: function() {
    return <li><a href id={this.props.data._id} onClick={this.charLinkClick}>{this.props.data.type} _id: {this.props.data._id} damage: {this.props.data.damage} melee: {this.props.data.melee} hp: {this.props.data.hp}  </a></li>
  }

});

var CharList = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {characters: [
      { _id: '1', type: 'Rat', damage: '1', melee: 'true', hp: '2'},
      { _id: '2', type: 'Snake', damage: '2', melee: 'true', hp: '3'}
    ]};
  },

  render: function() {

    // this.props.data --
    // userData: flux.store('UserStore').getState(),
    // charList: charStoreState.characters,
    // selectedCharId: charStoreState.selectedCharId
    console.log("char_list render");
    console.log("this.props.data");
    console.log(this.props.data);

    var characters = this.props.data.charList;
    console.log("char_list  characters");
    console.log(characters);
    var setFlag = this.props.setFlag;
    characters = this.props.data.charList.map(function(character) {
      return <Character data={character} key={character._id} setFlag={setFlag}/>;
    });
    return (
      <div>
      <h2>Characters</h2>
        <ul>
          {characters}
        </ul>
      </div>
    )
  }
});

module.exports = CharList;
