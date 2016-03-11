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
}]

const eventsList = [{
  "id": "0001",
  "gameName": "The Castles of Burgundy",
  "players": ["0001", "0002"],
  "winner": "0001"
},{
  "id": "0002",
  "gameName": "Twilight Struggle",
  "players": ["0001", "0003"],
  "winner": "0003"
},{
  "id": "0003",
  "gameName": "Dominant Species",
  "players": ["0001", "0003", "0004", "0005", "0006", "0007"],
  "winner": "0001"
},{
  "id": "0004",
  "gameName": "Jamaica",
  "players": ["0001", "0003", "0004", "0005", "0006", "0007"],
  "winner": "0007"
},{
  "id": "0005",
  "gameName": "Survive: Escape from Atlantis",
  "players": ["0001", "0003", "0004", "0005", "0006", "0007"],
  "winner": "0005"
}];



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

Codenames
Team Blue: 
Team Red:
*/


//
// ,{
//   "id": "0005",
//   "gameName": "Betrayal at House on the Hill",
//   "players": ["0001", "0003", "0004", "0005", "0006", "0007"],
//   "winner": ["0001", "0003", "0004", "0005", "0006"]
// }
