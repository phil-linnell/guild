"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactFire = require('reactfire');
const Firebase = require('firebase');

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

const Events = require('../events');
const User = require('../user');
const NewUser = require('../new-user');
const ListUsers = require('../list-users');
const NewEvent = require('../new-event');

const App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      loaded: false,
      users: {},
      events: {}
    }
  },
  componentWillMount: function() {
    let fbUsers = new Firebase(rootUrl + 'users/');
    this.bindAsObject(fbUsers, 'users');
    fbUsers.on('value', this.handleUserDateLoaded);
    this.bindAsObject(new Firebase(rootUrl + 'events/'), 'events');
  },
  render() {
    const rawUserData = this.state.users;
    let usersArray = [];
    for (let user in rawUserData) {usersArray.push(rawUserData[user])}

    const rawEventData = this.state.events;
    let eventsArray = [];
    for (let event in rawEventData) {eventsArray.push(rawEventData[event])}

    return (
      <div className="content">
        <div className="col">
          <NewEvent eventsStore={this.firebaseRefs.events} usersData={usersArray} />
          <Events />
        </div>
        <div className="col">
          <NewUser usersStore={this.firebaseRefs.users} />
          <ListUsers usersData={usersArray} loaded={this.state.loaded} />
          <User />
        </div>
      </div>
    );
  },
  handleUserDateLoaded() {
    this.setState({
      loaded: true
    })
  }
});

ReactDOM.render(<App />, document.querySelector('.container'));

// ReactDOM.render(App, document.querySelector('.container'));
