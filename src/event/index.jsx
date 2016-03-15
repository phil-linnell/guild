const Event = React.createClass({

  // Cross reference an event's winner id with all users to get the winner name
  // renderWinner(event) {
  //   const winnerName = usersList.map(all => {
  //     let players = event.players;
  //     console.table(players)
  //     if (winnerName.id === winners) {
  //       return winnerName.name;
  //     }
  //   });
  //   return winnerName;
  // },
  //

  // Render array of objects that shows the users
  // of the event that includes the player name
  renderEventPlayers(event) {
    // Change player ids with their equivalent user names
    const getUserName = event.players.map(obj => {
      const returnName = usersList.forEach(user => {
        if (obj.id === user.id) {
          obj.id = user.name;
        }
      });
      return returnName;
    });
    console.table(event.players);
    console.log(event)

    const getWinner = event.players.reduce((acc,cur) => {

    }, []);

    const displayEventUsers = event.players.map(player => {
      return <li>
        {player.id} {player.points} {player.colour}
      </li>
    });

    return displayEventUsers;
  }

  render() {
    const events = eventsList.map(event => {
      return <div className="row event-card">
        <div className="header">
          <div className="image"></div>
          <div className="info">
            <div className="id">{event.id}</div>
            <h2>{event.gameName}</h2>
            <div className="date">Date: </div>
          </div>
        </div>
        <h3>Players:</h3>
        <ul className="users">
          {this.renderEventPlayers(event)}
        </ul>
        <div className="winner">Winner: <span className="name"></span></div>
      </div>
    });
    return events
  },
}
