"use strict";

import React, { Component } from 'react';
import ReactFire from 'reactfire';
import Firebase from 'firebase';

import { getWinner } from '../../lib/utils'
import Event from '../event';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

class EventsList extends Component {

  render() {
    const {eventsData, usersData} = this.props;

    const eventsModified = eventsData.map(event => {
      // Add player name to the event data
      event.winner = [];
      const getName = event.players.map(player => {
        const returnName = usersData.forEach(user => {
          if (player.id === user.id) {
            player.name = user.name;
          }
        });
        const winningPoints = getWinner(event.players);
        if (`${winningPoints}` === player.points) {
          event.winner.push(player.id);
        }
        return returnName;
      });

      // Re-order according to points value
      const output = event.players.sort((a, b) => {
        return b.points - a.points
      });

      return output
    });

    const children = this.props.eventsData.map(event => {
      return (
        <Event
          event={event}
          key={event.key}
          >
        </Event>
      )
    }).reverse();

    return (
      <div className="event-list">
        {children}
      </div>
    );
  }

};

export default EventsList;
