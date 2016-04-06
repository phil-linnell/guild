"use strict";

var React = require('react');
var LinkedStateMixin = require('react-addons/lib/LinkedStateMixin');
const Select = require('react-select');

const NewEvent = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      noOfPlayers: 2,
      name: '',
      date: '',
      players: [{
        id: '',
        points: '',
        colour: '',
        faction: ''
      },{
        id: '',
        points: '',
        colour: '',
        faction: ''
      }]
    }
  },
  addEmptyPlayer() {
    this.state.players.concat({
      id: '',
      points: '',
      colour: '',
      faction: ''
    })
  },
  genericLink() {
    return (
      faction: this.state.players[i].faction,
      requestChange: this.handlePlayerFactionChange.bind(null, i)
    );
  },
  addPlayers() {
    const usersData = this.props.usersData;
    // Make user data acceptable for Select component
    usersData.map(user => {
      user.label = user.name
      user.value = user.id
    });
    let playersInputs = [];
    {this.state.players.map((x, i) => {
      let pointsLink = {
        points: this.state.players[i].points,
        requestChange: this.handlePlayerPointsChange.bind(null, i)
      }
      let colourLink = {
        colour: this.state.players[i].colour,
        requestChange: this.handlePlayerColourChange.bind(null, i)
      }
      let factionLink = {
        faction: this.state.players[i].faction,
        requestChange: this.handlePlayerFactionChange.bind(null, i)
      }
      let selectName = `select-${i}`;
      playersInputs.push(
        <div key={i} className="new-event-player">
          <Select
            name={selectName}
            className="type-name"
            value={this.state.players[i].id}
            options={usersData}
            onChange={this.handlePlayerNameChange.bind(null, i)}
          />
          <input
            valueLink={pointsLink}
            type="text"
            placeholder="Points" />
          <input
            valueLink={colourLink}
            type="text"
            placeholder="Colour" />
          <input
            valueLink={this.genericLink()}
            type="text"
            placeholder="Faction" />
        </div>
      )
    }, this)}
    return playersInputs;
  },
  render() {
    return (
      <div className="row form">
        <h2>Add new event</h2>
        <input
          value={this.state.name}
          onChange={this.handleChange('name')}
          type="text"
          placeholder="Event name" />
        <input
          value={this.state.date}
          onChange={this.handleChange('date')}
          type="text"
          placeholder="Date" />
        <div className="new-players">
          <h3>Players</h3>
          {this.addPlayers()}
          <button
            onClick={this.handleAddPlayer}
            type="button">
            Add
          </button>
        </div>
        <button
          onClick={this.handleClick}
          type="button"
          className="add-button">
          Save
        </button>
      </div>
    );
  },
  handlePlayerNameChange(i, id) {
    this.state.players[i].id = id
    this.setState({ players: this.state.players })
  },
  handlePlayerPointsChange(i, points) {
    this.state.players[i].points = points
    this.setState({ players: this.state.players })
  },
  handlePlayerColourChange(i, colour) {
    this.state.players[i].colour = colour
    this.setState({ players: this.state.players })
  },
  handlePlayerFactionChange(i, faction) {
    this.state.players[i].faction = faction
    this.setState({ players: this.state.players })
  },
  handleClick() {
    this.props.eventsStore.push({
      name: this.state.name,
      date: this.state.date,
      id: Date.now(),
      players: this.state.players
    })

    this.setState({
      name: '',
      date: '',
      players: []
    })
  },
  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  handleAddPlayer() {
    this.setState({
      noOfPlayers: this.state.noOfPlayers + 1,
      players: this.state.players.concat({
        id: '',
        points: '',
        colour: '',
        faction: ''
      })
    })
  }

});

module.exports = NewEvent;
