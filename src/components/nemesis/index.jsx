"use strict";

var React = require('react');
var classNames = require('classnames');

function isNotWinner(user) {
  return event => !event.winner.includes(user.name);
}

function nemesisCount(counts, user) {
  const find = _.find(counts, ['name', user]);

  if (find) {
    find.count += 1;
    return counts;
  }

  return counts.concat({name: user, count: 1})

}

function nemesisPicker(nemesii, nemesis) {
    if (nemesii.length === 0) {
      nemesii.push(nemesis)
    } else if (nemesii[0].count < nemesis.count) {
      nemesii = [nemesis];
    } else if (nemesii[0].count === nemesis.count) {
      nemesii.push(nemesis)
    }

    return nemesii;
}

// Experiment to merge the first filter and map of findNemesis
// function filterMap(user) {
//   return (acc, cur) => {
//     if (!cur.winner.includes(user.name)) {
//       acc.push(cur.winner)
//     }
//     return acc;
//   }, []);
// }

function findNemesis(user) {
  const counts = user.events.filter(isNotWinner(user))
                                .map(({winner}) => winner)
                                .reduce((a, b) => a.concat(b), [])
                                .reduce(nemesisCount, []);

  const nemesii = counts.reduce(nemesisPicker, []);

  if (nemesii.length === 0) {
    return "Won everything";
  }

  return nemesii.map(nemesis => `${nemesis.name} (${nemesis.count}) `);
}

function Nemesis({user}) {
  return (
    <div className="nemesis">
      Nemesis: {findNemesis(user)}
    </div>
  );
}

module.exports = Nemesis;
