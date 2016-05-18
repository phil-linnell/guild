"use strict";

import React, { Component } from 'react';
import ReactFire from 'reactfire';
import Firebase from 'firebase';
import moment from 'moment';

import { getWinner } from '../../lib/utils'
import Event from '../event';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

class EventsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      selectedDate: 'all'
    }
  }

  render() {
    const {eventsData, usersData} = this.props;

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

    const getEvents = this.props.eventsData.filter(value => {
      if (this.state.selectedDate === 'all') {
        return value;
      }
      return moment(this.state.selectedDate)._i === moment(value.date)._i;
    });

    const renderEventDetails = getEvents.map(event => {
      console.log(event);

      usersData.map(user => {

        console.log(user);

        // if user is in event give score and name

      });
    });

    const renderEvents = getEvents.map(event => {
      return (
        <Event
          eventData={event}
          key={event.key}
          users={usersData} />
      )
    }).reverse();

    return (
      <div className="events-list">
        {this.renderDateSelect()}
        {renderEventDetails}
        {renderEvents}
      </div>
    );
  }

  renderDateSelect() {
    const datesSelect = this.props.eventsData.map(event => event.date)
                            .filter((value, index, self) => self.indexOf(value) === index).reverse();

    return (
      <div className="dates-list">
        <select onChange={this.selectDate.bind(this)} value={this.state.selectedDate}>
          <option value="all" key="all">All</option>
          {datesSelect.map(date => {
            return (
              <option value={date} key={date}>{moment(date).format('Do MMMM YYYY')}</option>
            );
          })}
        </select>
      </div>
    );
  }

  selectDate(event) {
    this.setState({
      selectedDate: event.target.value
    })
  }

};

export default EventsList;
