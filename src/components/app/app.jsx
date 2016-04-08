"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactFire = require('reactfire');
const Firebase = require('firebase');

const rootUrl = 'https://boardgames-guild.firebaseio.com/';

const Tabs = require('react-simpletabs');

const EventsList = require('../events-list');
const Users = require('../users');
const NewUser = require('../new-user');
const ShowHideNewEvent = require('../show-hide-new-event');

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
        <Tabs>
          <Tabs.Panel title="Events">
            <ShowHideNewEvent eventsStore={this.firebaseRefs.events} usersData={usersArray} />
            <EventsList eventsData={rawEventData} usersData={usersArray} />
          </Tabs.Panel>
          <Tabs.Panel title="Users">
            <NewUser usersStore={this.firebaseRefs.users} />
            <Users usersData={usersArray} eventsData={eventsArray} loaded={this.state.loaded} />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  },

  getWinner(array) {
    return Math.max.apply(Math, array.map(player => player.points));
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
