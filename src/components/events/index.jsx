"use strict";

var React = require('react');
var classNames = require('classnames');
var moment = require('moment');

var EventPlayers = require('../event-players');

function Event({eventsData, usersData}) {

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

  const events = eventsData.map(event => {
    const date = moment(event.date).format('Do MMMM YYYY');
    const eventType = _.capitalize(event.type);

    return (
      <li className="row event-card" key={event.id}>
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <h2>{event.name}</h2>
            <div className="date">{date}</div>
            <div className="type">Game type: {eventType}</div>
          </div>
        </div>
        <h3>Players</h3>
        <EventPlayers event={event} type={event.type} />
      </li>
    );
  }).reverse();

  return (
    <ul>
      {events}
    </ul>
  );
}

module.exports = Event;
