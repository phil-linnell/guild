"use strict";

var React = require('react');
var classNames = require('classnames');

function EventPlayers({event, type}) {
  const displayEventUsers = event.players.map(EventPlayer(event, type));

  return (
    <ul className="event-players">
      {displayEventUsers}
    </ul>
  );
}

function EventPlayer(event, type) {
  return (player, i, players) => {
    let playerResult;
    playerResult = player.points;

    if (type === 'team' || type === 'race') {
      playerResult = (player.points === "1") ? "W" : "L";
    }

    const winningPoints = getWinner(event.players);
    const classes = classNames('event-player', player.colour, {
      winner: event.winner.includes(player.id)
    });

    let faction = (player.faction) ? `(${player.faction})` : false;

    const prevPoints = (i == 0) ? 0 : players[i - 1].points;
    const ranking = getRanking(player.points, i + 1, prevPoints);

    return (
      <li className={classes} key={player.id}>
        <div className="ranking">{ranking}</div>
        <div className="name">{player.name} {faction}</div>
        <div className="points">{playerResult}</div>
        <div className="colour"></div>
      </li>
    );
  }
}

function getOrdinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getRanking(points, position, previousPoints) {
  return (points === previousPoints) ? "=" : getOrdinal(position);
}

module.exports = EventPlayers;
