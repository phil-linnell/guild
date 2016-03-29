"use strict";

var React = require('react');
const NewEventPlayer = require('../new-event-player');

const NewEvent = React.createClass({

  getInitialState() {
    let playersValues = [];
    // for (let i = 0; i < 3; i++) {
    //   playersValues.push({
    //     name: '',
    //     points: ''
    //   })
    // }
    return {
      name: '',
      date: '',
      players: [{
        name: '',
        points: ''
      },{
        name: '',
        points: ''
      }]
    }
  },
  addPlayers() {
    let playersInputs = [];
    {this.state.players.map((x, i) => {
      var typeLink = {
        name: this.state.players[i].name,
        requestChange: this.handlePlayerNameChange.bind(null, i)
      }
      playersInputs.push(
        <div key={i}>

          <input
            valueLink={typeLink}
            type="text"
            placeholder={i} />

        </div>
      )
    }, this)}
    return playersInputs;
  },
  render() {
    return (
      <div className="row">
        <input
          value={this.state.name}
          onChange={this.handleChange('name')}
          type="text" />
        <input
          value={this.state.date}
          onChange={this.handleChange('date')}
          type="text" />
        <div className="new-player">
          {this.addPlayers()}
        </div>
        <button
          onClick={this.handleClick}
          type="button">
          Add
        </button>
      </div>
    );
  },
  handlePlayerNameChange(i, name) {
    this.state.players[i].name = name
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
  }
});

module.exports = NewEvent;
