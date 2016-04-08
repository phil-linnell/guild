"use strict";

const React = require('react');
const Firebase = require('firebase');
const classNames = require('classnames');

const rootUrl = 'https://boardgames-guild.firebaseio.com/';
const Select = require('react-select');

const NewEvent = React.createClass({
  getInitialState() {
    return {
      name: '',
      date: '',
      type: '',
      players: [{
        id:'',
        points: '',
        colour: '',
        faction: ''
      },{
        id:'',
        points: '',
        colour: '',
        faction: ''
      }]
    }
  },
  render() {
    return (
      <div className="new-event card">
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <input
              type="text"
              placeholder="Game name"
              value={this.state.name}
              name="name"
              onChange={this.handleInputChange} />
            <input
              type="text"
              placeholder="Date: 2016-03-25"
              value={this.state.date}
              name="date"
              onChange={this.handleInputChange} />
            <input
              type="text"
              placeholder="Game type"
              value={this.state.type}
              name="type"
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="players-header">
          <h2>Players</h2>
          <button
            className="add-player"
            onClick={this.handleAddPlayer}>
            Add player
          </button>
        </div>
        {this.renderNewPlayers()}
        <button
          onClick={this.handleSaveEvent}
          type="button"
          className="big-action-button">
          Save
        </button>
      </div>
    );
  },
  renderNewPlayers() {
    const usersData = this.props.usersData;
    // Make user data acceptable for Select component
    usersData.map(user => {
      user.label = user.name
      user.value = user.id
    });

    let playersInputs = [];
    {this.state.players.map((x, i) => {
      let selectName = `select-${i}`;
      playersInputs.push(
        <div className="new-event-player" key={`player-${i}`}>
          <Select
            name={selectName}
            className="type-name"
            value={this.state.players[i].id}
            options={usersData}
            placeholder="Name"
            onChange={this.handlePlayerNameChange.bind(null, i)}/>
          <input
            type="text"
            placeholder="Points"
            value={this.state.players[i].points}
            name="points"
            tabIndex={i}
            onChange={this.handlePlayerInputChange} />
          <input
            type="text"
            placeholder="Colour"
            value={this.state.players[i].colour}
            name="colour"
            tabIndex={i}
            onChange={this.handlePlayerInputChange} />
          <input
            type="text"
            placeholder="Faction"
            value={this.state.players[i].faction}
            name="faction"
            tabIndex={i}
            onChange={this.handlePlayerInputChange} />
          <button
            className="remove-player"
            onClick={this.handleRemovePlayer.bind(null, i)}>
          </button>
        </div>
      )
    }, this)}
    return playersInputs;
  },

  handleRemovePlayer(i) {
    console.log(i);
    this.state.players.splice(i, 1);
    this.setState({ players: this.state.players })
  },
  handleAddPlayer() {
    this.state.players = this.state.players.concat({
      id:'',
      points: '',
      colour: '',
      faction: ''
    });
    this.setState({ players: this.state.players })
  },
  handlePlayerNameChange(i, id) {
    this.state.players[i].id = id
    this.setState({ players: this.state.players })
  },
  handlePlayerInputChange(event) {
    this.state.players[event.target.tabIndex][event.target.name] = event.target.value
    this.setState({ players: this.state.players })
  },
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  },
  handleSaveEvent() {
    this.props.eventsStore.push({
      name: this.state.name,
      id: Date.now(),
      date: this.state.date,
      type: this.state.type,
      players: this.state.players
    })
    this.setState({
      name: '',
      date: '',
      type: '',
      players: [{
        id:'',
        points: '',
        colour: '',
        faction: ''
      },{
        id:'',
        points: '',
        colour: '',
        faction: ''
      }]
    });
  }
});

module.exports = NewEvent;
