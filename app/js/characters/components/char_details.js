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

    return <div><h2>Character Detail</h2>
             <br></br>{this.props.data.name}
             <br></br> Id: {this.props.data._id}
             <br></br> Owner: {this.props.data.owner}
             <br></br> Inventory: {this.props.data.invArray}
             <br></br> Paper Doll: {this.props.data.paperDoll}
             <br></br> Hit Point: {this.props.data.baseHP}
             <br></br> Mana: {this.props.data.baseMana}
             <br></br> Strength: {this.props.data.baseStr}
             <br></br> Dex: {this.props.data.baseDex}
             <br></br> Vitality: {this.props.data.baseVit}
             <br></br> Energy: {this.props.data.baseEne}
             <br></br>
          </div>
  }

});

module.exports = CharDetails;
