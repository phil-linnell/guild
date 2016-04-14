"use strict";

import React, { Component } from 'react';

class NewUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <div className="new-user card form">
        <input
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
          type="text"
          placeholder="New User"
          className="form-control" />
        <span className="input-group-btn">
          <button
            onClick={this.handleClick.bind(this)}
            className="big-action-button"
            type="button">
            Save
          </button>
        </span>
      </div>
    );
  }

  handleClick() {
    this.props.usersStore.push({
      name: this.state.name,
      id: Date.now()
    })

    this.setState({
      name: ''
    })
  }

  handleInputChange(event) {
    this.setState({
      name: event.target.value
    });
  }

};

export default NewUser;
