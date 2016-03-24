"use strict";

var React = require('react');

function PlayerRanking({player, index, players}) {
  const prevPoints = (index == 0) ? 0 : players[index - 1].points;
  const ranking = (player.points === prevPoints) ? "=" : getOrdinal(index + 1);

  return (
    <div className="ranking">{ranking}</div>
  );
};

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

module.exports = PlayerRanking;
