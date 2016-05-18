"use strict";

import React, { Component } from 'react';
import Firebase from 'firebase';
import classNames from 'classnames';
import Select from 'react-select';
import $ from 'jquery';
import _ from 'lodash';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';
const bggUrl = 'http://bgg-api.herokuapp.com/api/v1/search';

class EditEvent extends Component {

  constructor(props) {
    super(props);

    let playersData = []
    this.props.eventData.players.forEach((player, i) => {
      playersData.push({
        id: player.id,
        points: player.points,
        colour: player.colour,
        faction: player.faction
      })
    })

    this.state = {
      searchTerm: '',
      searchResults: {},
      name: this.props.eventData.name,
      bggId: this.props.eventData.bggId,
      date: this.props.eventData.date,
      type: this.props.eventData.type,
      players: playersData
    };
  }

  renderSearchResults() {
    if (!_.isEmpty(this.state.searchResults)) {
      if (this.state.searchResults.items.hasOwnProperty('item')) {
        let showResults = [];
        this.state.searchResults.items.item.map(item => {
          showResults.push(item);
        });
        return (
          <ul className="search-results">
            {showResults.map(item => {
              console.log(`${item.name[0].$.value} - ${item.$.id}`)
              return (
                <li
                  onClick={this.handleChooseGame.bind(this, item)}
                  key={item.$.id}>
                  {item.name[0].$.value}
                </li>
              )
            })}
          </ul>
        );
      } else {
        return (
          <div className="search-results no-results">No results</div>
        );
      }
    }
  }

  handleSearchName(event) {
    event.persist();
    this.setState({
      searchResults: {},
      name: event.target.value
    });
    this.delayedCallback(event);
  }

  componentWillMount() {
    this.fb = new Firebase(rootUrl + 'events/' + this.props.eventData.key);
    this.delayedCallback = _.debounce(event => {
      this.setState({
        searchTerm: event.target.value
      })
      this.searchResults();
    }, 400);
  }

  searchResults() {
    $.ajax({
      method: "GET",
      dataType : "json",
      url: "http://bgg-api.herokuapp.com/api/v1/search",
      data:{
        type: 'boardgame',
        query: this.state.searchTerm
      },
      success: result => this.setState({searchResults: result}),
      error: result => console.log("Error" + result)
    });
  }

  render() {

    return (
      <div className="new-event card">
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <div className="game">
              <input
                type="text"
                placeholder="Game name"
                value={this.state.name}
                name="name"
                onChange={this.handleSearchName.bind(this)} />
              {this.renderSearchResults()}
            </div>
            <input
              type="text"
              placeholder="Date: 2016-03-25"
              value={this.state.date}
              name="date"
              onChange={this.handleInputChange.bind(this)} />
            <input
              type="text"
              placeholder="Game type"
              value={this.state.type}
              name="type"
              onChange={this.handleInputChange.bind(this)} />
          </div>
        </div>
        <div className="players-header">
          <h2>Players</h2>
          <button
            className="add-player"
            onClick={this.handleAddPlayer.bind(this)}>
            Add player
          </button>
        </div>
        {this.renderNewPlayers()}
        <button
          onClick={this.handleSaveEvent.bind(this)}
          type="button"
          className="big-action-button save-edit">
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

  handleChooseGame(item) {
    this.setState({
      name: item.name[0].$.value,
      bggId: item.$.id,
      searchResults: {}
    });
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
    this.fb.update({
      name: this.state.name,
      date: this.state.date,
      type: this.state.type,
      players: this.state.players,
      bggId: this.state.bggId
    });
  }
};

export default EditEvent;
