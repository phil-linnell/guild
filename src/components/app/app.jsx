"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactFire = require('reactfire');
const Firebase = require('firebase');

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

const Events = require('../events');
const Users = require('../users');
const NewUser = require('../new-user');
const NewEvent = require('../new-event');
const TestInputs = require('../test-inputs');

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
    fbUsers.on('value', this.handleUserDataLoaded);

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
          <TestInputs />
          <NewEvent eventsStore={this.firebaseRefs.events} usersData={usersArray} />
          <Events eventsData={eventsArray} usersData={usersArray} />
        </div>
        <div className="col">
          <NewUser usersStore={this.firebaseRefs.users} />
          <Users usersData={usersArray} eventsData={eventsArray} loaded={this.state.loaded} />
        </div>
      </div>
    );
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

ReactDOM.render(<App />, document.querySelector('.container'));

// ReactDOM.render(App, document.querySelector('.container'));
