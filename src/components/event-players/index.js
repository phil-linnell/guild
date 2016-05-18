"use strict";

import React, { Component } from 'react';
import classNames from 'classnames';

import PlayerRanking from '../player-ranking';

class EventPlayers extends Component {

  render() {
    const {eventData, type} = this.props;
    const showAllEventPlayers = eventData.players.map(this.eachEventPlayer(eventData, type));

    return (
      <ul className="event-players">
        {showAllEventPlayers}
      </ul>
    );
  }

  eachEventPlayer(event, type) {
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

};

export default EventPlayers;
