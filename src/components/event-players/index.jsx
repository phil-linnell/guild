"use strict";

var React = require('react');
var classNames = require('classnames');

function getOrdinal(n) {
  var s=["th","st","nd","rd"],
  v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

let tempPoints = 0;
function getPosition(stats, i) {
  stats.position = getOrdinal((i+1));
  if (stats.points === tempPoints) {
    stats.position = " = ";
  }
  tempPoints = stats.points;
  return stats.position;
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
      winner: event.winner.includes(player.id)
    });
    let faction = (player.faction) ? `(${player.faction})` : false;
    const position = getPosition(player, i);
    return <li className={classes} key={player.id}>
      <div className="position">{position}</div>
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
