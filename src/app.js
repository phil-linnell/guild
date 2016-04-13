"use strict";

import './app.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactFire, { bindAsObject } from 'reactfire';
import Firebase from 'firebase';

import {getWinner} from './lib/utils'
import Tabs from './components/tabs';
import UsersList from './components/users-list';
import NewUser from './components/new-user';
import EventsList from './components/events-list';
import NewEvent from './components/new-event';

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

const tabList = [{
  id: 1,
  name: "Events",
  url: "/events"
},{
  id: 2,
  name: "Users",
  url: "/users"
},{
  id: 3,
  name: "New Event",
  url: "/new-event"
},{
  id: 4,
  name: "New User",
  url: "/new-user"
}]

// Not updated to ES6 'class App extends Component' as
// there is a conflict with 'mixins: [ReactFire]'
const App = React.createClass({

  mixins: [ ReactFire ],

  getInitialState() {
    return {
      currentTab: 1,
      loaded: false,
      users: {},
      events: {}
    }
  },

  componentWillMount() {
    let fbUsers = new Firebase(rootUrl + 'users/');
    this.bindAsObject(fbUsers, 'users');
    fbUsers.on('value', this.handleUserDataLoaded);

    this.bindAsObject(new Firebase(rootUrl + 'events/'), 'events');
  },

  render() {
    const rawUserData = this.state.users;
    let usersArray = [];
    for (let user in rawUserData) {usersArray.push(rawUserData[user])}

    const rawEventData = this.state.events;
    let eventsArray = [];
    for (let key in rawEventData) {
      const event = rawEventData[key]
      event.key = key;
      eventsArray.push(rawEventData[key])
    }

    const eventsModified = eventsArray.map(event => {
      // Add player name to the event data
      event.winner = [];
      const getName = event.players.map(player => {
        const returnName = usersArray.forEach(user => {
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

    return (
      <div className="content">
        <Tabs tabs={tabList} currentTab={this.state.currentTab} changeTab={this.changeTab} />
        <NewEvent eventsStore={this.firebaseRefs.events} usersData={usersArray} />
        <EventsList eventsData={eventsArray} usersData={usersArray} />
        <NewUser usersStore={this.firebaseRefs.users} />
        <UsersList usersData={usersArray} eventsData={eventsArray} loaded={this.state.loaded} />
      </div>
    );
  },

  changeTab(tab) {
    this.setState({
      currentTab: tab.id
    })
  },

  handleUserDataLoaded() {
    this.setState({
      loaded: true
    })
  },

  getNameFromId(playerId) {
    return usersArray.find(user => user.id === playerId).name;
  }

});

ReactDOM.render(<App />, document.getElementById('container'));
