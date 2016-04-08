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
      <div className="card event-card" key={event.key}>
        <div className="header">
          <div className="image"></div>
          <div className="info">
            {/*<button
              className="delete-event"
              onClick={this.handleDeleteEvent}>
              Delete
            </button>*/}
            <h1>{event.name}</h1>
            <div className="date">{date}</div>
            <div className="type">Type: {eventType}</div>
          </div>
        </div>
        <div className="players-header">
          <h2>Players</h2>
        </div>
        <EventPlayers event={event} type={event.type} />
      </div>
    );
  },
  handleDeleteEvent() {
    this.fb.remove()
  }
});

module.exports = Event;
