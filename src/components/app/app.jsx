"use strict";

const React = require('react');
const ReactDOM = require('react-dom')
const Events = require('../events');
const User = require('../user');

const App = React.createClass({

  // Render the users in order of users in descending order of win ratio
  // renderLeaderboard() {
  //   const output = usersList.sort((a,b) => {
  //     return this.userWinRatio(b) - this.userWinRatio(a);
  //   }).map((user) => {
  //     return <div>
  //       {this.renderUser(user)}
  //     </div>
  //   })
  //   return output;
  // },

  render() {

    return (
      <div className="content">
        <div className="col">
          <Events />
        </div>
        <div className="col">
          <User />
        </div>
      </div>
    );
  }

});


ReactDOM.render(<App />, document.querySelector('.container'));

// ReactDOM.render(App, document.querySelector('.container'));
