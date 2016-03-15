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

const eventsList = [{
  "id": "0004",
  "gameName": "Jamaica",
  "type": "Most points wins", // Most points, team (1+ teams), order (1st, 2nd...)
  "players": [{
    "id": "0007",
    "points": "40",
    "colour": "red"
  },{
    "id": "0001",
    "points": "37",
    "colour": "green"
  },{
    "id": "0004",
    "points": "26",
    "colour": "blue"
  },{
    "id": "0005",
    "points": "25",
    "colour": "pink"
  },{
    "id": "0003",
    "points": "15",
    "colour": "yellow"
  },{
    "id": "0006",
    "points": "10",
    "colour": "black"
  }],
  "date": "2016-03-11",
  "notes": "Some notes about the game"
}];

//
// const eventsList2 = [{
//   "id": "0001",
//   "gameName": "The Castles of Burgundy",
//   "players": [["0001"], ["0002"]],
//   "date": "2016-03-01"
// },{
//   "id": "0002",
//   "gameName": "Twilight Struggle",
//   "players": [["0003"], ["0001"]],
//   "date": "2016-03-09"
// },{
//   "id": "0003",
//   "gameName": "Dominant Species",
//   "players": [["0001"], ["0003", "0004", "0005", "0006", "0007"]],
//   "date": "2016-03-11"
// },{
//   "id": "0004",
//   "gameName": "Jamaica",
//   "players": [{
//     "winner": ["0007", "40", "red"],
//     "others": [["0001", "37", "green"], ["0004", "26", "blue"], ["0005", "25", "pink"], ["0003", "15", "yellow"], ["0006", "10", "black"]]
//   }]
//   "date": "2016-03-11"
// },{
//   "id": "0005",
//   "gameName": "Survive: Escape from Atlantis",
//   "players": [["0005"], ["0001", "0003", "0004", "0006", "0007"]],
//   "date": "2016-03-11"
// },{
//   "id": "0006",
//   "gameName": "7 Wonders",
//   "players": [["0008"], ["0001", "0003", "0004", "0005", "0006", "0007"]],
//   "date": "2016-03-11"
// },{
//   "id": "0007",
//   "gameName": "Cash n Guns",
//   "players": [["0003"], ["0001", "0004", "0005", "0006", "0007", "0008"]],
//   "winner": "0003",
//   "date": "2016-03-11"
// }];



/*
DS
Phil, Amphibians, Blue 100
Ben, Insects, green 81
Kyle, Birds, yellow 80
Dom, Arachnids, red 75
Kelv, Mammals, white 72
Rob, Reptiles, black 49

Jam
Rob, red, 40
Phil, Green, 37
Dom, Yellow, 15
Kyle, pink 25
Kelv, blue, 26
Ben, black, 10

Survive
Rob, Green, 4
Phil, Orange, 5
Dom, Yellow, 5
Kyle, Red 12
Kelv, blue, 2
Ben, White, 1

7 Wonders
Phil Babylon 55
Kelv Ephesos 38
Dom Olympos 52
Kyle Rhodes 33
Rob Giza 52
Mike Alexandria 61
Ben Halikarnassos 34

Cash n Guns
Dom
Kyle
Phil
Ben
Mike
Did not finish Kelv and Rob
*/


//
// ,{
//   "id": "0005",
//   "gameName": "Betrayal at House on the Hill",
//   "players": ["0001", "0003", "0004", "0005", "0006", "0007"],
//   "winner": ["0001", "0003", "0004", "0005", "0006"]
// }
