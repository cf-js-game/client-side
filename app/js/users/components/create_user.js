'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CreateUser = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {newUser: {username: '', password: '', email: ''}, changed: false};
  },
  handleChange: function(event) {
    var stateCopy = this.state;
    stateCopy.changed = true;
    if (event.target.name === 'user-username')
      stateCopy.newUser.username = event.target.value;
    if (event.target.name === 'user-email')
      stateCopy.newUser.email = event.target.value;
    if (event.target.name === 'user-password')
      stateCopy.newUser.password = event.target.value;

    this.setState(stateCopy);

  },
  handleSubmit: function(event) {

    event.preventDefault();

    this.props.setFlag("submitClickedOnCreateUser");
    // createUser() does not do this.emit(change)
    // "getUsersCharacters"  does  this.emit(change)
    this.getFlux().actions.createUser(this.state.newUser);

    // "getUsersCharacters" must be called after "login"
    //  ... because it assumes the cookie has the token
    // "getUsersCharacters"  does  this.emit(change)
    this.getFlux().actions.getUsersCharacters(this.state.newUser);

  },
  render: function() {
    var usernameError;
    var emailError;
    var passwordError;
    var submitButton;
    if (this.state.newUser.username.length < 1 && this.state.changed)
      usernameError = <span>user name cannot be blank</span>;
    if (this.state.newUser.email.length < 1 && this.state.changed)
      emailError = <span>email cannot be blank</span>;
    if (this.state.newUser.password.length < 1 && this.state.changed)
      passwordError = <span>password cannot be blank</span>;
    if (usernameError || emailError || passwordError || !this.state.changed)
      submitButton = <button type="submit" disabled>Create a new user</button>;
    else
      submitButton = <button type="submit" >Create a new user</button>;

    return (
      <div id="create-user">
        <h2>Create User</h2>
        <form name="signupform" onSubmit={this.handleSubmit}>
          <table>
            <tr>
              <td><label htmlFor="username">User Name:</label></td>
              <td><input type="text" name="user-username" id="username" value={this.state.newUser.username} onChange={this.handleChange} /></td>
              <td>{usernameError}</td>
            </tr>

            <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td><input type="text" name="user-email" id="email" value={this.state.newUser.email} onChange={this.handleChange} /></td>
              <td>{emailError}</td>
            </tr>

            <tr>
              <td><label htmlFor="password">Password:</label></td>
              <td><input type="password" name="user-password" id="password" value={this.state.newUser.password} onChange={this.handleChange} /></td>
              <td>{passwordError}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>{submitButton}</td>
            </tr>
          </table>
        </form>
      </div>
    )
  }
});

module.exports = CreateUser;
