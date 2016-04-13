"use strict";

import './users-list';

import React, { Component } from 'react';
import classNames from 'classnames';

import Nemesis from '../nemesis';

function UsersList({usersData, eventsData, loaded}) {

  const classes = classNames('users-list', {
    loaded: loaded
  });

  const usersModified = usersData.map(user => {
    // Add each event and points to user data
    user.events = [];
    user.allColours = [];
    const returnEvents = eventsData.map(event => {

      const winningPoints = getWinner(event.players);
      event.players.map(player => {
        if (player.id === user.id) {
          user.events.push(event)
          user.allColours.push(player.colour)
        }
      });
    });
    return returnEvents;
  });

  const output = usersData.map(user => {
    // TODO: Extract the whole wins, no. of events and winratio into a component
    let totalGamesWon = 0;
    const totalGamesPlayed = user.events.map(userEvent => {
      if (userEvent.winner.includes(user.id)) {
        totalGamesWon += 1;
      }
      return `${userEvent.name}, `
    });

    let winRatio;
    if (totalGamesPlayed.length < 1) {
      winRatio = 'NA';
    } else {
      winRatio = `${Math.round(totalGamesWon / totalGamesPlayed.length * 100 * 10) / 10}%`;
    }

    let renderNemesis;
    if (totalGamesPlayed.length > 0) {
      renderNemesis = <Nemesis user={user} usersData={usersData} />
    }
    return (
      <div className="card user-card" key={user.id}>
        <div className="info">
          <h2 className="name">{user.name}</h2>
          <div className="win-ratio">{winRatio}</div>
          <div className="wins">Won: {totalGamesWon} of {totalGamesPlayed.length}</div>
          {renderNemesis}
          <div className="all-games">All Games played: {totalGamesPlayed}</div>
        </div>
      </div>
    );
  });

  return (
    <div className={classes}>
      {output}
    </div>
  );
  
}

module.exports = UsersList;
