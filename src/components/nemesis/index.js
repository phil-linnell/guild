"use strict";

import React, { Component } from 'react';
import classNames from 'classnames';

class Nemesis extends Component {

  render() {
    const { user, usersData } = this.props;

    return (
      <div className="nemesis">
        Nemesis: {this.findNemesis(user, usersData)}
      </div>
    );
  }

  findNemesis(user, usersData) {
    const counts = user.events.filter(this.isNotWinner(user))
                                  .map(({winner}) => winner)
                                  .reduce((a, b) => a.concat(b), [])
                                  .reduce(this.nemesisCount, []);

    const allNemeses = counts.reduce(this.nemesisPicker, []);

    if (allNemeses.length === 0) {
      return "Won everything";
    }

    return allNemeses.map(nemesis => `${usersData.find(user => user.id === nemesis.id).name} (${nemesis.count}) `);
  }

  isNotWinner(user) {
    return event => !event.winner.includes(user.id);
  }

  nemesisCount(counts, user) {
    const find = _.find(counts, ['id', user]);

    if (find) {
      find.count += 1;
      return counts;
    }

    return counts.concat({id: user, count: 1})
  }

  nemesisPicker(output, nemesis) {
    if (output.length === 0) {
      output.push(nemesis)
    } else if (output[0].count < nemesis.count) {
      output = [nemesis];
    } else if (output[0].count === nemesis.count) {
      output.push(nemesis)
    }

    return output;
  }

}

export default Nemesis;
