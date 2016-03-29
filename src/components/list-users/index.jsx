"use strict";

var React = require('react');
var classNames = require('classnames');

const ListUsers = React.createClass({
  render() {
    const classes = classNames('list-users', {
      loaded: this.props.loaded
    });

    return <ul className={classes}>
      {this.renderList()}
    </ul>
  },

  renderList() {
    const usersData = this.props.usersData;

    if (usersData && usersData.length === 0) {
      return (
        <h4>No users</h4>
      );
    } else {
      return usersData.map(user => {
        return (
          <li className="row user-card" key={user.id}>
            {user.name}
          </li>
        );
      });
    }
  }
});

module.exports = ListUsers;
