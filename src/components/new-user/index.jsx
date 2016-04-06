"use strict";

var React = require('react');

const NewUser = React.createClass({

  getInitialState() {
    return {
      name: ''
    }
  },
  render() {
    return (
      <div className="row form">
        <h2>Add new user</h2>
        <input
          value={this.state.name}
          onChange={this.handleInputChange}
          type="text"
          className="form-control" />
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="add-button"
            type="button">
            Save
          </button>
        </span>
      </div>
    );
  },
  handleClick() {
    this.props.usersStore.push({
      name: this.state.name,
      id: Date.now()
    })

    this.setState({
      name: ''
    })
  },
  handleInputChange(event) {
    this.setState({
      name: event.target.value
    });
  }
});

module.exports = NewUser;
