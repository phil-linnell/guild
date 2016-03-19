const usersList = [{
  "id": "0001",
  "name": "Phil"
},{
  "id": "0002",
  "name": "Tully"
},{
  "id": "0003",
  "name": "Dom"
},{
  "id": "0004",
  "name": "Kelv"
},{
  "id": "0005",
  "name": "Kyle"
},{
  "id": "0006",
  "name": "Ben"
},{
  "id": "0007",
  "name": "Rob"
},{
  "id": "0008",
  "name": "Mike"
}]

/*
event.typ = points (e.g. 42,12,57) || team (e.g. Phil & Tully beat Dom & Kelv) || race (e.g. 1st, 2nd, 3rd)
*/

const eventsList = [{
  "id": "0001",
  "gameName": "Twilight Struggle",
  "type": "race",
  "players": [{
    "id": "0001",
    "points": "0",
    "colour": "red",
    "faction": "USSR"
  },{
    "id": "0003",
    "points": "1",
    "colour": "blue",
    "faction": "USA"
  }],
  "date": "2016-03-01",
  "notes": ""
},{
  "id": "0002",
  "gameName": "Test Game",
  "type": "points",
  "players": [{
    "id": "0001",
    "points": "30",
    "colour": "red"
  },{
    "id": "0002",
    "points": "30",
    "colour": "white"
  },{
    "id": "0008",
    "points": "26",
    "colour": "blue"
  }]
},{
  "id": "0003",
  "gameName": "Dominant Species",
  "type": "points",
  "players": [{
    "id": "0001",
    "points": "100",
    "colour": "blue",
    "faction": "Amphibians"
  },{
    "id": "0006",
    "points": "81",
    "colour": "green",
    "faction": "Insects"
  },{
    "id": "0004",
    "points": "72",
    "colour": "white",
    "faction": "Mammals"
  },{
    "id": "0005",
    "points": "80",
    "colour": "yellow",
    "faction": "Birds"
  },{
    "id": "0007",
    "points": "49",
    "colour": "black",
    "faction": "Reptiles"
  },{
    "id": "0003",
    "points": "75",
    "colour": "red",
    "faction": "Arachnids"
  }],
  "date": "2016-03-11",
  "notes": "Some notes about the game"
},{
  "id": "0004",
  "gameName": "Jamaica",
  "type": "points",
  "players": [{
    "id": "0001",
    "points": "37",
    "colour": "green"
  },{
    "id": "0006",
    "points": "10",
    "colour": "black"
  },{
    "id": "0004",
    "points": "26",
    "colour": "blue"
  },{
    "id": "0005",
    "points": "25",
    "colour": "pink"
  },{
    "id": "0007",
    "points": "40",
    "colour": "red"
  },{
    "id": "0003",
    "points": "15",
    "colour": "yellow"
  }],
  "date": "2016-03-11",
  "notes": "Some notes about the game"
},{
  "id": "0005",
  "gameName": "Betrayal at House on the Hill",
  "type": "team",
  "players": [{
    "id": "0001",
    "points": "1"
  },{
    "id": "0006",
    "points": "1"
  },{
    "id": "0005",
    "points": "1"
  },{
    "id": "0007",
    "points": "0"
  },{
    "id": "0004",
    "points": "1"
  },{
    "id": "0003",
    "points": "1"
  }],
  "date": "2016-03-11",
  "notes": "Some notes about the game"
},{
  "id": "0006",
  "gameName": "Survive: Escape from Atlantis",
  "type": "points",
  "players": [{
    "id": "0001",
    "points": "5",
    "colour": "orange"
  },{
    "id": "0006",
    "points": "1",
    "colour": "white"
  },{
    "id": "0005",
    "points": "12",
    "colour": "red"
  },{
    "id": "0007",
    "points": "4",
    "colour": "green"
  },{
    "id": "0004",
    "points": "2",
    "colour": "blue"
  },{
    "id": "0003",
    "points": "5",
    "colour": "yellow"
  }],
  "date": "2016-03-11",
  "notes": "Some notes about the game"
},{
  "id": "0007",
  "gameName": "7 Wonders",
  "type": "points",
  "players": [{
    "id": "0001",
    "points": "55",
    "colour": "",
    "faction": "Babylon"
  },{
    "id": "0006",
    "points": "34",
    "colour": "",
    "faction": "Hallikarnassus"
  },{
    "id": "0005",
    "points": "33",
    "colour": "",
    "faction": "Rhodes"
  },{
    "id": "0007",
    "points": "52",
    "colour": "",
    "faction": "Giza"
  },{
    "id": "0004",
    "points": "38",
    "colour": "",
    "faction": "Ephesos"
  },{
    "id": "0003",
    "points": "52",
    "colour": "",
    "faction": "Olympia"
  },{
    "id": "0008",
    "points": "61",
    "colour": "",
    "faction": "Alexandria"
  }],
  "date": "2016-03-11",
  "notes": "Some notes about the game"
}];

function getWinner(array) {
  return Math.max.apply(Math, array.map(player => {
    return player.points;
  }));
}


const eventsModified = eventsList.map(event => {
  // Add player name to the event data
  event.winner = [];
  const getName = event.players.map(player => {
    const returnName = usersList.forEach(user => {
      if (player.id === user.id) {
        player.name = user.name;
      }
    });
    const winningPoints = getWinner(event.players);
    if (`${winningPoints}` === player.points) {
      event.winner.push(player.name);
    }
    return returnName;
  });

  // Re-order according to points value
  const output = event.players.sort((a, b) => {
    return b.points - a.points
  });

  return output
});

console.log(eventsList);

const usersModified = usersList.map(user => {
  // Add each event and points to user data
  user.events = [];
  user.allColours = [];
  const returnEvents = eventsList.map(event => {

    const winningPoints = getWinner(event.players);
    event.players.map(player => {
      if (player.id === user.id) {
        // user.events.push({
        //   name: event.gameName,
        //   points: player.points,
        //   colour: player.colour,
        //   winner: `${winningPoints}` === player.points,
        //   // position: TODO: Get placing in this game, .e.g 1st, 2nd equal...
        // })
        user.events.push(event)
        user.allColours.push(player.colour)
      }
    });
  });
  return returnEvents;
});

console.log(usersList)


/*
{
  "id": "0001",
  "gameName": "",
  "type": "Most points wins",
  "players": [{
    "id": "0001",
    "points": "1",
    "colour": ""
  },{
    "id": "0002",
    "points": "0",
    "colour": ""
  }],
  "date": "2016-03-01",
  "notes": ""
}
*/




/*
Cash n Guns
Dom
Kyle
Phil
Ben
Mike
Did not finish Kelv and Rob
*/
