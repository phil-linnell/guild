"use strict";

import React, { Component } from 'react';

class Tabs extends Component {

  render() {
    return (
      <ul className="tabs">
        {this.props.tabs.map(tab => {
          return (
            <li
              key={tab.id}
              className={(this.props.currentTab === tab.id) ? 'current' : ''}
              onClick={this.handleClick.bind(this, tab)}>
              {tab.name}
            </li>
          );
        })}
      </ul>
    );
  }

  handleClick(tab) {
    this.props.changeTab(tab);
  }

}

export default Tabs;
