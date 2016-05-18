"use strict";

import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Firebase from 'firebase';
import $ from 'jquery';

import EventPlayers from '../event-players';
import EditEvent from '../edit-event';

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
    this.fb = new Firebase(rootUrl + 'events/' + this.props.eventData.key)
  }

  componentDidMount() {
    const { eventData } = this.props;
    if (eventData.bggId) {
      const bggUrl = `http://bgg-api.herokuapp.com/api/v1/thing?id=${eventData.bggId}&stats=1`

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
    const { eventData } = this.props;
    const date = moment(eventData.date).format('Do MMMM YYYY');
    const eventType = _.capitalize(eventData.type);

    let imageUrl, bggRank, bggLink;
    if (this.state.loaded) {
      imageUrl = `http:${this.state.bggData.items.item[0].thumbnail[0]}`;
      bggRank = this.state.bggData.items.item[0].statistics[0].ratings[0].ranks[0].rank[0].$.value;
      bggLink = `https://boardgamegeek.com/boardgame/${this.state.bggData.items.item[0].$.id}/${_.kebabCase(this.state.bggData.items.item[0].name[0].$.value)}`
    }

    return (
      <div className="card event-card" key={eventData.id}>
        <button
          className="edit-event"
          onClick={this.handleEditEvent.bind(this)}>
        </button>
        <div className="header">
          <div className="image">
            <img src={imageUrl} />
          </div>
          <div className="info">
            <h1>{eventData.name} <span className="bgg-rank">(<a href={bggLink}>BGG Rank: {bggRank}</a>)</span></h1>
            <div className="date">{date}</div>
            <div className="type">Type: {eventType}</div>
          </div>
        </div>
        <div className="players-header">
          <h2>Players</h2>
        </div>
        <EventPlayers eventData={eventData} type={eventData.type} />
      </div>
    );
  }

  renderEditEvent() {
    return (
      <div className="card edit-event-card">
        <button
          className="close-edit-view"
          onClick={this.handleSaveit.bind(this)}>
        </button>
        <EditEvent eventData={this.props.eventData} usersData={this.props.users} />
        <button
          onClick={this.handleDeleteEvent.bind(this)}
          className="big-action-button delete-event">
          Delete
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
