'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

//  if (submitClickedOnLogin)
//    homePageCenterPanel = <CharList data={this.state} setFlag={this.setFlag}/>;
//
//  where this.props.data =
//  {
//    userData: flux.store('UserStore').getState(),
//    charList: charStoreState.characters,
//    selectedCharId: charStoreState.selectedCharId
//  };

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

    var charId = this.props.data._id;
    //set flag to control look
    //call action to run CharStore

    this.props.setFlag("showCharacterDetails");

    // this function call needs changing to something else
    // &&&
    this.getFlux().actions.selectChar(charId);
  },

  render: function() {
    return <li><a href id={this.props.data._id} onClick={this.charLinkClick}>{this.props.data.name} _id: {this.props.data._id} owner: {this.props.data.owner} </a></li>
  }

});


var CharList = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return { };
  },

  handleSubmit: function(event) {
    event.preventDefault();

    this.props.setFlag("startGame");

    //this.emit('change');
    // &&& need call to new function in char_store
    // ... that only calls emit ?
    this.getFlux().actions.displayCreateUser();
  },

  render: function() {

    // this.props.data --
    // userData: flux.store('UserStore').getState(),
    // charList: charStoreState.characters,
    // selectedCharId: charStoreState.selectedCharId

    var characters = this.props.data.charList;

    var setFlag = this.props.setFlag;
    characters = this.props.data.charList.map(function(character) {
      return <Character data={character} key={character._id} setFlag={setFlag}/>;
    });

    var submitButton;
    if (this.props.data.selectedCharId)
      submitButton = <button type="submit">Start Game</button>;
    else
      submitButton = <button type="submit" disabled>Start Game</button>;

    // if user selected character from the char_list
    // ... enable the Start Game button
    // ... otherwise disable Start Game button
    // this.data.selectedCharId <> null
    return (
      <div>
      <h2>Characters</h2>
        <ul>
          {characters}
        </ul>
        <form name="startGameForm" onSubmit={this.handleSubmit}>
          {submitButton}
        </form>
        <br></br>
      </div>
    )
  }
});

module.exports = CharList;
