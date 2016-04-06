"use strict";

var React = require('react');
const Select = require('react-select');

const NewEventPlayers = React.createClass({
  render() {

  }
});

module.exports = NewEventPlayers;


// const usersData = this.props.usersData;
// // Make user data acceptable for Select component
// usersData.map(user => {
//   user.label = user.name
//   user.value = user.id
// });
// let playersInputs = [];
// {this.state.players.map((x, i) => {
//   let selectName = `select-${i}`;
//   playersInputs.push(
//     <div key={i} className="new-event-player">
//       <Select
//         name={selectName}
//         className="type-name"
//         value={this.state.players[i].id}
//         options={usersData}
//         onChange={this.handlePlayerNameChange.bind(null, i)}
//       />
//       <input
//         valueLink={pointsLink}
//         type="text"
//         placeholder="Points" />
//       <input
//         valueLink={colourLink}
//         type="text"
//         placeholder="Colour" />
//       <input
//         valueLink={factionLink}
//         type="text"
//         placeholder="Faction" />
//     </div>
//   )
// }, this)}
// return playersInputs;
