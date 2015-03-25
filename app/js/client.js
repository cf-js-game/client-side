'use strict';


// var GameStart = require('./game/main');
// require('craftyjs');

//window.addEventListener('load', GameStart);

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
var CharForm = require('./characters/components/char_form');

// react-game
var GameComponent = require('./react_game/components/react_game');
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
  },

  getUsersCharacters: function() {
     this.dispatch(constants.GET_USER_CHARS);
  },

  addCharacter: function(newCharacter) {
     this.dispatch(constants.ADD_NEW_CHAR, newCharacter);
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
var startGame = false;

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
    //   userData:  { token: this.token }
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
    case "startGame":
        startGame = true;
        console.log("set startGame to true");
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
  handleLogout: function(e) {
    e.preventDefault();

    createUserClicked = false;
    loginClicked = false;
    submitClickedOnLogin = false;
    showCharacterDetails = false;
    startGame = false;

    this.getFlux().actions.logout();
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
    console.log("startGame = " + startGame);

    var logout = <div><a href onClick={this.handleLogout}>Log Out</a><br></br></div>;
    if (createUserClicked) homePageCenterPanel = <CreateUser setFlag={this.setFlag}/>;
    if (loginClicked) homePageCenterPanel = <Login setFlag={this.setFlag}/>;
    if (submitClickedOnLogin) homePageCenterPanel = <div>{logout}<CharForm /><CharList data={this.state} setFlag={this.setFlag}/></div>;
    if (showCharacterDetails) {
      // loop thru the array looking for selectedCharId
      var selectedCharIndex = 0;
      for (var i=0; i<this.state.charList.length; i++) {
        if (this.state.selectedCharId === this.state.charList[i]._id) {
          selectedCharIndex = i;
        }
      }

      console.log("selectedCharIndex = " + selectedCharIndex);
      homePageCenterPanel = <div>{logout}<CharForm /><CharList data={this.state} setFlag={this.setFlag}/><CharDetails data={this.state.charList[selectedCharIndex]} setFlag={this.setFlag}/></div>;
    }

    if (startGame) homePageCenterPanel = <div>{logout}<CharDetails data={this.state.charList[selectedCharIndex]} setFlag={this.setFlag}/><GameComponent data={this.state} setFlag={this.setFlag}/></div>;

    return (
      <main>
        {homePageCenterPanel}
      </main>
    )
  }
});

React.render(<App flux={flux}/>, document.body);

