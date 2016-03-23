"use strict";

var React = require('react');

function PlayerRanking(player, i, prevPoints) {
  const ranking = getRanking(player.points, i + 1, prevPoints);
  console.log(ranking)

  return (
    <div className="ranking">{ranking}</div>
  );
};

function getOrdinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getRanking(points, position, previousPoints) {
  return (points === previousPoints) ? "=" : getOrdinal(position);
}

module.exports = PlayerRanking;
