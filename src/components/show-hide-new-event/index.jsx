"use strict";

const React = require('react');
const classNames = require('classnames');
const NewEvent = require('../new-event');

const ShowHideNewEvent = React.createClass({
  getInitialState() {
    return {
      addNew: false
    }
  },
  render() {
    let showForm;
    let showDismiss;
    if (this.state.addNew) {
      showForm = <NewEvent eventsStore={this.props.eventsStore} usersData={this.props.usersData} />
      showDismiss = true;
    } else {
      showForm = null;
      showDismiss = false;
    }
    const classes = classNames("show-hide-new-event", {
      showdismiss: showDismiss
    })
    return (
      <div className={classes}>
        <button
          className="action-button add-new-event"
          onClick={this.handleAddNewEvent}>
          New Event
        </button>
        <button
          className="dismiss"
          onClick={this.handleDismiss}></button>
        {showForm}
      </div>
    )
  },

  handleDismiss() {
    this.setState({
      addNew: false
    })
  },
  handleAddNewEvent() {
    this.setState({
      addNew: true
    })
  },
});

module.exports = ShowHideNewEvent;
