"use strict";

import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Firebase from 'firebase';
import $ from 'jquery';

import EventPlayers from '../event-players';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

class Event extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bggData: {},
      loaded: false,
      editState: false
    }
  }

  componentWillMount() {
    this.fb = new Firebase(rootUrl + 'events/' + this.props.event.key)
  }

  componentDidMount() {
    const { event } = this.props;
    if (event.bggId) {
      const bggUrl = `http://bgg-api.herokuapp.com/api/v1/thing?id=${event.bggId}&stats=1`

      $.ajax({
        url: bggUrl,
        dataType: 'json',
        cache: false,
        success: data => {
          this.setState({
            bggData: data,
            loaded: true
          });
        },
        error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
      });
    }
  }

  renderEvent() {
    const { event } = this.props;
    const date = moment(event.date).format('Do MMMM YYYY');
    const eventType = _.capitalize(event.type);

    let imageUrl, bggRank, bggLink;
    if (this.state.loaded) {
      imageUrl = `http:${this.state.bggData.items.item[0].thumbnail[0]}`;
      bggRank = this.state.bggData.items.item[0].statistics[0].ratings[0].ranks[0].rank[0].$.value;
      bggLink = `https://boardgamegeek.com/boardgame/${this.state.bggData.items.item[0].$.id}/${_.kebabCase(this.state.bggData.items.item[0].name[0].$.value)}`
    }

    return (
      <div className="card event-card" key={event.key}>
        <button
          className="edit-event"
          onClick={this.handleEditEvent.bind(this)}>
          Edit
        </button>
        <div className="header">
          <div className="image">
            <img src={imageUrl} />
          </div>
          <div className="info">
            <h1>{event.name} <span className="bgg-rank">(<a href={bggLink}>BGG Rank: {bggRank}</a>)</span></h1>
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

  renderEditEvent() {
    return (
      <div className="card edit-event-card">
        <button
          className="delete-event"
          onClick={this.handleDeleteEvent.bind(this)}>
          Delete
        </button>
        <button
          className="close"
          onClick={this.handleSaveit.bind(this)}>
          X
        </button>
      </div>
    );
  }

  render() {
    const classes = classNames('event', {
      editable: this.state.editState
    });

    return (
      <div className={classes}>
        {this.renderEvent()}
        {this.renderEditEvent()}
      </div>
    );
  }

  handleEditEvent() {
    this.setState({
      editState: true
    });
  }

  handleSaveit() {
    this.setState({
      editState: false
    });
  }

  handleDeleteEvent() {
    this.fb.remove()
  }

};

export default Event;
