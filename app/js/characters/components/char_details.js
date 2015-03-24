'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CharDetails = React.createClass({
  mixins: [FluxMixin],
  // getInitialState: function(charIdentifier) {
  //   // pcharIdentifier = { _id: "1" }
  //   console.log("char_details getInitialState");
  //   console.log("charIdentifier");
  //   console.log(charIdentifier);

  //   var characters = this.getFlux().actions.getState();

  //   return characters[charIdentifier._id - 1];
  //   // return {charDetails:
  //   //   { _id: '1', type: 'Rat', damage: '1', melee: 'true', hp: '2'}
  //   // };
  // },

  render: function() {
    //  data={"1"} is passed in
    //<CharDetails data={this.state} setFlag={this.setFlag}/>
    console.log("CharDetails render");
    console.log("this.props");
    console.log(this.props);
   //this.getInitialState({ _id: this.state.charDetails._id });

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
          </div>


    // owner: {type: String, required: true},
    // name: {type: String, required: true},
    // invArray: {type: Array, default: []},
    // paperDoll: {type: String, default: equiped},
    // baseHP: {type: Number, default: 50},
    // baseMana: {type: Number, default: 50},
    // baseStr: {type: Number, default: 10},
    // baseDex: {type: Number, default: 10},
    // baseVit: {type: Number, default: 10},
    // baseEne: {type: Number, default: 10}

  }

});

module.exports = CharDetails;
