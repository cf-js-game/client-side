'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

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
          </div>
        );
  }

});

module.exports = CharDetails;
