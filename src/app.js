"use strict";

import './app.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactFire, { bindAsObject } from 'reactfire';
import Firebase from 'firebase';

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
  }

});

ReactDOM.render(<App />, document.getElementById('container'));
