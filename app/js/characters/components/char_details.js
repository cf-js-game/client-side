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

    return <div><h2>Character Detail</h2> <br></br>{this.props.data.type} <br></br>_id: {this.props.data._id}<br></br> damage: {this.props.data.damage}<br></br> melee: {this.props.data.melee}<br></br> hp: {this.props.data.hp}</div>
  }

});

module.exports = CharDetails;
