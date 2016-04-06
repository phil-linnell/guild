"use strict";

const React = require('react');
const ReactFire = require('reactfire');
const Event = require('../event');
const Firebase = require('firebase');
const rootUrl = 'https://boardgames-guild.firebaseio.com/';

const EventsList = React.createClass({
  render() {
    const {eventsData, usersData} = this.props;

    let children = [];
    for(var key in this.props.eventsData) {
      var event = this.props.eventsData[key];
      event.key = key;
      children.push(
        <Event
          event={event}
          key={key}
          >
        </Event>
      )
    }
    children.reverse();

    return (
      <ul>
        {children}
      </ul>
    );
  }
});

module.exports = EventsList;
