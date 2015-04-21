'use strict';

var React = require('react');
var Fluxxor = require('fluxxor')
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Login = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {user: {username: '', password: '', email: ''}};
  },
  handleChange: function(event) {
    var stateCopy = this.state;
    stateCopy.changed = true;

    if (event.target.name === 'user-username')
      stateCopy.user.username = event.target.value;
    if (event.target.name === 'user-email')
      stateCopy.user.email = event.target.value;
    if (event.target.name === 'user-password')
      stateCopy.user.password = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.props.setFlag("submitClickedOnLogin");
    // login does not do this.emit(change)
    // "getUsersCharacters"  does  this.emit(change)
    this.getFlux().actions.login(this.state.user);
    // "getUsersCharacters" must be called after "login"
    //  ... because it assumes the cookie has the token
    // "getUsersCharacters"  does  this.emit(change)
    //this.getFlux().actions.getUsersCharacters();

  },
  render: function() {

    var usernameError;
    var passwordError;
    var emailError;
    var emailRE = /[A-za-z0-9]+\@[A-Za-z0-9\-]+\.\w{2,3}/g;
    var submitButton;

    if (this.state.user.username.length < 1 && this.state.changed)
      usernameError = <span style={{color: '#ff0000'}}>User name cannot be blank.</span>;

    if (this.state.user.email.length < 10 && this.state.changed && !this.state.user.email.length.match(emailRE)) {
      emailError = <span style={{color: '#ff0000'}}>Email cannot be blank and must be valid.</span>;
    }

    if (this.state.user.password.length < 1 && this.state.changed)
      passwordError = <span style={{color: '#ff0000'}}>Password cannot be blank.</span>;

    if (emailError || passwordError && !this.state.changed)
      submitButton = <button type="submit" disabled>Login</button>;
    else
      submitButton = <button type="submit" >Login</button>;

    return (
      <div id="login-form">
        <h2>Login</h2>
        <form name="signinform" onSubmit={this.handleSubmit}>
          <table>
            <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td><input type="text" name="user-email" id="email" value={this.state.user.email} onChange={this.handleChange} /></td>
              <td>{emailError}</td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password:</label></td>
              <td><input type="password" name="user-password" id="password" value={this.state.user.password} onChange={this.handleChange} /></td>
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

module.exports = Login;
