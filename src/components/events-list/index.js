"use strict";

import React, { Component } from 'react';
import ReactFire from 'reactfire';
import Firebase from 'firebase';

import Event from '../event';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

class EventsList extends Component {

  render() {
    const {eventsData, usersData} = this.props;

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
