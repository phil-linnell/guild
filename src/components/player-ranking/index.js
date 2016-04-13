"use strict";

import React, { Component } from 'react';

class PlayerRanking extends Component {

  render() {
    const {player, index, players} = this.props;
    const prevPoints = (index == 0) ? 0 : players[index - 1].points;
    const ranking = (player.points === prevPoints) ? "=" : this.getOrdinal(index + 1);

    return (
      <div className="ranking">{ranking}</div>
    );
  }

  getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;

    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  
};

export default PlayerRanking;
