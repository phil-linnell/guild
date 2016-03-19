"use strict";

var React = require('react');
var classNames = require('classnames');

function getOrdinal(n) {
  var s=["th","st","nd","rd"],
  v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

function getPosition(points, i) {
  // If player points are the same as previous player points, return "="
  return getOrdinal((i+1));
}

function EventPlayers({event, type}) {
  const displayEventUsers = event.players.map((player, i) => {
    let playerResult;
    playerResult = player.points;
    if (type === 'team' || type === 'race') {
      if (player.points === "1") {
        playerResult = 'W';
      } else {
        playerResult = 'L';
      }
    }
    const winningPoints = getWinner(event.players);
    const classes = classNames('event-player', player.colour, {
      winner: event.winner.includes(player.name)
    });
    let faction = (player.faction) ? `(${player.faction})` : false;
    return <li className={classes} key={player.id}>
      <div className="position">{getPosition(player.points, i)}</div>
      <div className="name">{player.name} {faction}</div>
      <div className="points">{playerResult}</div>
      <div className="colour"></div>
    </li>
  });

  return <ul className="event-players">
    {displayEventUsers}
  </ul>;
}

module.exports = EventPlayers;
