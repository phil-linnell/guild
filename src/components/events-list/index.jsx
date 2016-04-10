"use strict";

const React = require('react');
const ReactFire = require('reactfire');
const Event = require('../event');
const Firebase = require('firebase');
const rootUrl = 'https://boardgames-guild.firebaseio.com/';

const EventsList = React.createClass({
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
});

module.exports = EventsList;
