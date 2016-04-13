"use strict";

import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Firebase from 'firebase';

import EventPlayers from '../event-players';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

class Event extends Component {

  componentWillMount() {
    this.fb = new Firebase(rootUrl + 'events/' + this.props.event.key)
  }

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
              onClick={this.handleDeleteEvent.bind(this)}>
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
  }

  // handleDeleteEvent() {
  //   this.fb.remove()
  // }

};

export default Event;
