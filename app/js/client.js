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
var CharList = require('./characters/components/char_list');
var CharDetails = require('./characters/components/char_details');
var CharForm = require('./characters/components/char_form');

// react-game
var GameComponent = require('./react_game/components/react_game');
var actions = {
  login: function(user, callback) {
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

  // getUsersCharacters: function() {
  //    this.dispatch(constants.GET_USER_CHARS);
  // },

  addCharacter: function(newCharacter) {
     this.dispatch(constants.ADD_NEW_CHAR, newCharacter);
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
var submitClickedOnLogin = false;
var showCharacterDetails = false;
var startGame = false;

var App = React.createClass({
  state: {},

  mixins: [
    FluxMixin,
    StoreWatchMixin('UserStore')
  ],


  getStateFromFlux: function() {
    var flux = this.getFlux();

    var userStoreState = flux.store('UserStore').getState();

    var results = {
      userData: userStoreState.token,
      charList: userStoreState.characters,
      selectedCharId: userStoreState.selectedCharId
    };

    return results;

    // State --
    // {
    //   userData:  { token: this.token }
    // }
  },

  setFlag: function(flag) {

    switch(flag) {
    case "submitClickedOnLogin":
        submitClickedOnLogin = true;
        break;
    case "showCharacterDetails":
        showCharacterDetails = true;
        break;
    case "startGame":
        startGame = true;
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

    //var createUser = <a href onClick={this.handleCreateUserButton}>Create User</a>;
    //var createUser = <button onClick={this.handleCreateUserButton}>Create</button>;
    var homePageCenterPanel = <div><button onClick={this.handleCreateUserButton}>Create</button><button onClick={this.handleLoginButton}>Login</button></div>;

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

