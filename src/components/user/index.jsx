"use strict";

var React = require('react');
var classNames = require('classnames');

var Nemesis = require('../nemesis');

function User({event}) {
  const output = usersList.map(user => {
    // TODO: Extract the whole wins, no. of events and winratio into a component
    let totalGamesWon = 0;
    const totalGamesPlayed = user.events.map(userEvent => {
      if (userEvent.winner.includes(user.id)) {
        totalGamesWon += 1;
      }
      return `${userEvent.gameName}, `
    });
    const winRatio = Math.round(totalGamesWon / totalGamesPlayed.length * 100 * 10) / 10;
    return (
      <li className="row user-card" key={user.id}>
        <div className="info">
          <h2 className="name">{user.name}</h2>
          <div className="win-ratio">{winRatio}%</div>
          <div className="wins">{totalGamesWon} of {totalGamesPlayed.length}</div>
          <Nemesis user={user} />
          <div className="all-games">All Games played: {totalGamesPlayed}</div>
        </div>
      </li>
    );
  });

  return (
    <ul>
      {output}
    </ul>
  );
}

module.exports = User;

/*
// const x = if (this.userEvents(user).length > 0) {
//   // let games = this.userBestEvent(user).map(val => {
//   //   return <span className="games">
//   //     {val.name} <span className="count">({val.count})</span>
//   //   </span>;
//   // });
//   // if (this.userBestEvent(user).length === 0) {
//   //   games = "No wins yet"
//   // }
//   return <div className="row user-card">
//     <div className="info">
//       <div className="most-wins">Most wins in: {games}</div>
//       <div className="nemesis">Nemesis: {this.userNemesis(user)}</div>
//     </div>
//   </div>
// }
// Which events a user has won
// userWins(user) {
//   let wins = [];
//   eventsList.map(event => {
//     if (event.winner === user.id) {
//       wins.push(event.gameName);
//     }
//   });
//   return wins;
// },



// userNemesis(user) {
//   let didNotWin = [];
//   eventsList.map(event => {
//     if (event.players.includes(user.id) && (user.id != event.winner)) {
//       didNotWin.push(event);
//     }
//   });
//
//   const xs = didNotWin.map(val => {
//     return val.winner;
//   });
//
//   const counts = xs.reduce((a, b, i, array) => {
//     const find = _.find(a, ['winner', array[i]]);
//     if (find) {
//       find.count += 1;
//       return a;
//     } else {
//       return a.concat({winner: array[i], count: 1})
//     }
//   }, []);
//
//   const output = counts.reduce((acc,x) => {
//     if (acc.length === 0) {
//       acc.push(x)
//     } else if (acc[0].count < x.count) {
//       acc = [x];
//     } else if (acc[0].count === x.count) {
//       acc[0].count += 1;
//     }
//     return acc;
//   }, [])
//
//   const final = usersList.map(usr => {
//     const d = output.map(d => {
//       if (usr.id === d.winner) {
//         return usr.name;
//       }
//     });
//     return d;
//   });
//
//   return final;
// },
//
// // Get user's most successful event
// userBestEvent(user) {
//
//   const list = this.userWins(user);
//
//   const counts = list.reduce((a, b, i, array) => {
//     const find = _.find(a, ['name', array[i]]);
//     if (find) {
//       find.count += 1;
//       return a;
//     } else {
//       return a.concat({name: array[i], count: 1})
//     }
//   }, []);
//
//   const output = counts.reduce((acc,x) => {
//     if (acc.length === 0) {
//       acc.push(x)
//     } else if (acc[0].count < x.count) {
//       acc = [x];
//     } else if (acc[0].count === x.count) {
//       acc.push(x);
//     }
//     return acc;
//   }, [])
//
//   return output;
// },
//
// // Calculate percentage win ratio of a user
// userWinRatio(user) {
//   return Math.round(this.userWins(user).length / this.userEvents(user).length * 100 * 10) / 10;
// },

*/
