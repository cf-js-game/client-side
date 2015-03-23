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
var Login = require('./users/components/login');

//characters
var CharStore = require('./characters/char_store');
var CharList = require('./characters/components/char_list');
var CharDetails = require('./characters/components/char_details');

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
  },

  selectChar: function(charId) {
     this.dispatch(constants.SELECT_CHAR, charId);
  }

};

var stores = {
  UserStore: new UserStore(),
  CharStore: new CharStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var createUserClicked = false;
var loginClicked = false;
var submitClickedOnLogin = false;
var showCharacterDetails = false;

var App = React.createClass({
  state: {},

  mixins: [
    FluxMixin,
    StoreWatchMixin('UserStore', 'CharStore')
  ],


  getStateFromFlux: function() {
    var flux = this.getFlux();
    var charStoreState = flux.store('CharStore').getState();

    var results = {
      userData: flux.store('UserStore').getState(),
      charList: charStoreState.characters,
      selectedCharId: charStoreState.selectedCharId
    };

    console.log("getStateFromFlux");

    console.log("charStoreState");
    console.log(charStoreState);
    console.log("this.state");
    console.log(this.state);
    return results;

    // State --
    // {
    //   userData:  { eat: this.eat }
    // }
  },

  setFlag: function(flag) {
    console.log("App component setFlag");
    switch(flag) {
    case "submitClickedOnLogin":
        submitClickedOnLogin = true;
        break;
    case "showCharacterDetails":
        console.log("set showCharacterDetails to true");
        showCharacterDetails = true;

        break;
    default:
        submitClickedOnLogin = true;
        break;
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
    console.log("App component render");
    //var createUser = <a href onClick={this.handleCreateUserButton}>Create User</a>;
    //var createUser = <button onClick={this.handleCreateUserButton}>Create</button>;
    var homePageCenterPanel = <div><button onClick={this.handleCreateUserButton}>Create</button><button onClick={this.handleLoginButton}>Login</button></div>;

    //var login = <button onClick={this.handleLoginButton}>Login</button>;

    console.log("this.state");
    console.log(this.state);
    console.log("this.state.selectedCharId");
    console.log(this.state.selectedCharId);

    // should these be state variables?
    console.log("createUserClicked = " + createUserClicked);
    console.log("loginClicked = " + loginClicked);
    console.log("submitClickedOnLogin = " + submitClickedOnLogin);
    console.log("showCharacterDetails = " + showCharacterDetails);

    if (createUserClicked) homePageCenterPanel = <CreateUser />;
    if (loginClicked) homePageCenterPanel = <Login setFlag={this.setFlag}/>;
    if (submitClickedOnLogin) homePageCenterPanel = <CharList data={this.state} setFlag={this.setFlag}/>;
    if (showCharacterDetails) homePageCenterPanel = <div><CharList data={this.state} setFlag={this.setFlag}/><CharDetails data={this.state.charList[this.state.selectedCharId - 1]} setFlag={this.setFlag}/></div>;
    return (
      <main>
        {homePageCenterPanel}
      </main>
    )
  }
});

React.render(<App flux={flux}/>, document.body);

