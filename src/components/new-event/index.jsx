"use strict";

const React = require('react');
const Firebase = require('firebase');

const rootUrl = 'https://boardgames-guild.firebaseio.com/';
const Select = require('react-select');
const NewEventPlayers = require('../new-event-players');

let defaultStates = {
  name: '',
  date: '',
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

const NewEvent = React.createClass({
  getInitialState() {
    return {
      name: '',
      date: '',
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
      <div className="row form">
        <h2>Add new event</h2>
        <div className="new-players">
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
          {this.renderNewPlayers()}
          <button
            onClick={this.handleAddPlayer}>
            Add player
          </button>
        </div>
        <button
          onClick={this.handleSaveEvent}
          type="button"
          className="add-button">
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
            placeholder="Faction"
            value={this.state.players[i].faction}
            name="faction"
            tabIndex={i}
            onChange={this.handlePlayerInputChange} />
          <button
            onClick={this.handleRemovePlayer.bind(null, i)}>
            X
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
      players: this.state.players
    })
    this.setState({
      name: '',
      date: '',
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
