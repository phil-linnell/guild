"use strict";

import React, { Component } from 'react';

class Tabs extends Component {

  render() {
    return (
      <ul>
        {this.props.tabs.map(tab => {
          return (
            <li key={tab.id} className={(this.props.currentTab === tab.id) ? 'current' : ''}>
              <a onClick={this.handleClick.bind(this, tab)} href={tab.url}>{tab.name}</a>
            </li>
          );
        })}
      </ul>
    );
  }

  handleClick(tab, event) {
    // event.preventDefault();
    this.props.changeTab(tab);
  }

}

export default Tabs;
