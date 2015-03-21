'use strict';


var GameStart = require('./game/main');
require('craftyjs');

window.addEventListener('load', GameStart);

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('./constants');

//users and session
var UserStore = require('./users/user_store');
var CreateUser = require('./users/components/create_user');
var Login = require('./users/components/login');

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
  },

  displayLogin: function() {
    this.dispatch(constants.DISPLAY_LOGIN);
  }
};

var stores = {
  UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var createUserClicked = false;
var loginClicked = false;

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
  handleLoginButton: function(e) {
    e.preventDefault();
    this.getFlux().actions.displayLogin();
    loginClicked = true;
  },

  render: function() {
    //var createUser = <a href onClick={this.handleCreateUserButton}>Create User</a>;
    //var createUser = <button onClick={this.handleCreateUserButton}>Create</button>;
    var login = <div><button onClick={this.handleCreateUserButton}>Create</button><button onClick={this.handleLoginButton}>Login</button></div>;

    //var login = <button onClick={this.handleLoginButton}>Login</button>;

    var homePageCenterPanel = login;
    if (createUserClicked) homePageCenterPanel = <CreateUser />
    if (loginClicked) homePageCenterPanel = <Login />
    return (
      <main>
        {homePageCenterPanel}
      </main>
    )
  }
});

React.render(<App flux={flux}/>, document.body);

