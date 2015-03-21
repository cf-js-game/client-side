'use strict';

// require('craftyjs');

// // Crafty Specifics
// Crafty.init(500, 500, document.getElementById('game'));

// Crafty.background('#000000');

// Crafty.e('2D, Canvas, Color, Fourway')
// 	.attr({x: 10, y: 10, w: 20, h: 20})
// 	.color('#00ff00')
// 	.fourway(4);

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('./constants');

//users and session
var UserStore = require('./users/user_store');
var CreateUser = require('./users/components/create_user');

var actions = {
  login: function(user) {
    this.dispatch(constants.LOGIN, user);
  },

  logout: function() {
    this.dispatch(constants.LOGOUT);
  },

  createUser: function(user) {
    this.dispatch(constants.CREATE_USER, user);
  },

  displayCreateUser: function() {
    this.dispatch(constants.DISPLAY_CREATE_USER);
  }
};

var stores = {
  UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var  createUserClicked = false;

var App = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UserStore')],


  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState()
    };
  },
  handleCreateUserButton: function(e) {
    e.preventDefault();
    this.getFlux().actions.displayCreateUser();
    createUserClicked = true;
  },

  render: function() {
    //var createUser = <a href onClick={this.handleCreateUserButton}>Create User</a>;
    var createUser = <button onClick={this.handleCreateUserButton}>Create User</button>;
    var homePageCenterPanel = createUser;
    if (createUserClicked) homePageCenterPanel = <CreateUser />
    return (
      <main>
        {homePageCenterPanel}
      </main>
    )
  }
});

React.render(<App flux={flux}/>, document.body);

