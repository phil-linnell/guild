"use strict";

import React, { Component } from 'react';
import Firebase from 'firebase';
import classNames from 'classnames';
import Select from 'react-select';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

class NewEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  render() {
    const { name, date, type } = this.props;

    return (
      <div className="new-event card">
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <input
              type="text"
              placeholder="Game name"
              value={name}
              name="name"
              onChange={this.handleInputChange.bind(this)} />
            <input
              type="text"
              placeholder="Date: 2016-03-25"
              value={date}
              name="date"
              onChange={this.handleInputChange.bind(this)} />
            <input
              type="text"
              placeholder="Game type"
              value={type}
              name="type"
              onChange={this.handleInputChange.bind(this)} />
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
          onClick={this.handleSaveEvent.bind(this)}
          type="button"
          className="big-action-button">
          Save
        </button>
      </div>
    );
  }

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
            onChange={this.handlePlayerNameChange.bind(this, i)}/>
          <input
            type="text"
            placeholder="Points"
            value={this.state.players[i].points}
            name="points"
            onChange={this.handlePlayerInputChange.bind(this, i)} />
          <input
            type="text"
            placeholder="Colour"
            value={this.state.players[i].colour}
            name="colour"
            onChange={this.handlePlayerInputChange.bind(this, i)} />
          <input
            type="text"
            placeholder="Faction"
            value={this.state.players[i].faction}
            name="faction"
            onChange={this.handlePlayerInputChange.bind(this, i)} />
          <button
            className="remove-player"
            onClick={this.handleRemovePlayer.bind(this, i)}>
          </button>
        </div>
      )
    }, this)}
    return playersInputs;
  }

  handleRemovePlayer(i) {
    this.state.players.splice(i, 1);
    this.setState({ players: this.state.players })
  }

  handleAddPlayer() {
    this.state.players = this.state.players.concat({
      id:'',
      points: '',
      colour: '',
      faction: ''
    });
    this.setState({ players: this.state.players })
  }

  handlePlayerNameChange(i, id) {
    this.state.players[i].id = id
    this.setState({ players: this.state.players })
  }

  handlePlayerInputChange(i, event) {
    this.state.players[i][event.target.name] = event.target.value
    this.setState({ players: this.state.players })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

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
};

export default NewEvent;
