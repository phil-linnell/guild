"use strict";

var React = require('react');
var classNames = require('classnames');
var moment = require('moment');

var EventPlayers = require('../event-players');

function Event() {
  const events = eventsList.map(event => {
    const date = moment(event.date).format('Do MMMM YYYY');
    const eventType = _.capitalize(event.type);
    
    return (
      <li className="row event-card" key={event.id}>
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <h2>{event.gameName}</h2>
            <div className="date">{date}</div>
            <div className="type">Game type: {eventType}</div>
          </div>
        </div>
        <h3>Players</h3>
        <EventPlayers event={event} type={event.type} />
      </li>
    );
  });

  return (
    <ul>
      {events}
    </ul>
  );
}

module.exports = Event;
