"use strict";

var React = require('react');
var classNames = require('classnames');

function Nemesis({user, usersData}) {
  return (
    <div className="nemesis">
      Nemesis: {findNemesis(user, usersData)}
    </div>
  );
}

function findNemesis(user, usersData) {
  const counts = user.events.filter(isNotWinner(user))
                                .map(({winner}) => winner)
                                .reduce((a, b) => a.concat(b), [])
                                .reduce(nemesisCount, []);

  const allNemeses = counts.reduce(nemesisPicker, []);

  if (allNemeses.length === 0) {
    return "Won everything";
  }

  return allNemeses.map(nemesis => `${usersData.find(user => user.id === nemesis.id).name} (${nemesis.count}) `);
}

function isNotWinner(user) {
  return event => !event.winner.includes(user.id);
}

function nemesisCount(counts, user) {
  const find = _.find(counts, ['id', user]);

  if (find) {
    find.count += 1;
    return counts;
  }

  return counts.concat({id: user, count: 1})
}

function nemesisPicker(output, nemesis) {
  if (output.length === 0) {
    output.push(nemesis)
  } else if (output[0].count < nemesis.count) {
    output = [nemesis];
  } else if (output[0].count === nemesis.count) {
    output.push(nemesis)
  }

  return output;
}

module.exports = Nemesis;
