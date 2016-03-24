"use strict";

var React = require('react');
var classNames = require('classnames');

var PlayerRanking = require('../player-ranking');

function EventPlayers({event, type}) {
  const showAllEventPlayers = event.players.map(EachEventPlayer(event, type));

  return (
    <ul className="event-players">
      {showAllEventPlayers}
    </ul>
  );
}

function EachEventPlayer(event, type) {
  return (player, index, players) => {
    const classes = classNames('event-player', player.colour, {
      winner: event.winner.includes(player.id)
    });

    // If faction, show it
    const faction = (player.faction) ? `(${player.faction})` : false;
    
    // Show points or W/L
    let playerResult;
    playerResult = player.points;
    if (type === 'team' || type === 'race') {
      playerResult = (player.points === "1") ? "W" : "L";
    }

    return (
      <li className={classes} key={player.id}>
        <PlayerRanking player={player} index={index} players={players} />
        <div className="name">{player.name} {faction}</div>
        <div className="points">{playerResult}</div>
        <div className="colour"></div>
      </li>
    );
  }
}

module.exports = EventPlayers;