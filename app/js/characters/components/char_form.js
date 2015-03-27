'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CharForm = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {newCharacter: {name: '', hp: ''}};
  },
  handleChange: function(event) {
    event.preventDefault();

    var stateCopy = this.state;
    if (event.target.name === 'new-character-name')
      stateCopy.newCharacter.name = event.target.value;
    if (event.target.name === 'new-character-hitpower')
      stateCopy.newCharacter.hp = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.addCharacter(this.state.newCharacter);
    this.setState({newCharacter: {name: '', hp: ''}});
  },
  render: function() {
    return (
      <form id='char-form' onSubmit={this.handleSubmit}>
        <label htmlFor="new-character-name">New Character</label>
        <input id="new-character-name" type="text" value={this.state.newCharacter.name} onChange={this.handleChange} name="new-character-name"/>
        <button type="submit">Create New Character</button>
      </form>
    )
  }
});

module.exports = CharForm;
