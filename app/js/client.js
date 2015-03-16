'use strict';

var React = require('react');

var charData = [{noteBody: 'hello world', _id: 1}, {noteBody: 'goodbye world', _id: 2}];

var NoteForm = React.createClass({
  getInitialState: function() {
    return {newNote: {noteBody: ''}};
  },
  handleChange: function(event) {
    this.setState({newNote: {noteBody: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.props.onNewNoteSubmit(this.state.newNote);
    this.setState({newNote: {noteBody: ''}});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newnote">New Note</label>
        <input id="newnote" type="text" value={this.state.newNote.noteBody} onChange={this.handleChange}/>
        <button type="submit">Create New Note</button>
      </form>
    )
  }
});

var Note = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>
  }
});

var NoteList = React.createClass({
  render: function() {
    var notes = this.props.data.map(function(note) {
      return <Note data={note} key={note._id}/>
    });
    return (
      <section>
        <h1>Notes:</h1>
        <ul>
          {notes}
        </ul>
      </section>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {notesData: notesData};
  },
  onNewNote: function(note) {
    note._id = this.state.notesData.length + 1;
    var stateCopy = this.state;
    stateCopy.notesData.push(note);
    this.setState(stateCopy);
  },
  render: function() {
    return (
      <main>
        <NoteForm onNewNoteSubmit={this.onNewNote}/>
        <NoteList data={this.state.notesData} />
      </main>
    )
  }
});

React.render(<App />, document.body);