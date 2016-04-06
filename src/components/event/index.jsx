"use strict";

const React = require('react');
const classNames = require('classnames');
const moment = require('moment');
const Firebase = require('firebase');
const rootUrl = 'https://boardgames-guild.firebaseio.com/';
const EventPlayers = require('../event-players');

const Event = React.createClass({
  componentWillMount() {
    this.fb = new Firebase(rootUrl + 'events/' + this.props.event.key)
  },
  render() {
    const {event} = this.props;
    const date = moment(event.date).format('Do MMMM YYYY');
    const eventType = _.capitalize(event.type);

    return (
      <li className="row event-card" key={event.key}>
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <button
              className="delete-event"
              onClick={this.handleDeleteEvent}>
              Delete
            </button>
            <h2>{event.name}</h2>
            <div className="date">{date}</div>
            <div className="type">Type: {eventType}</div>
          </div>
        </div>
        <h3>Players</h3>
        <EventPlayers event={event} type={event.type} />
      </li>
    );
  },
  handleDeleteEvent() {
    this.fb.remove()
  }
});

module.exports = Event;
