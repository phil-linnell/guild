export function getWinner(array) {
  return Math.max.apply(Math, array.map(player => player.points));
}

export function getNameFromId(playerId) {
  return usersArray.find(user => user.id === playerId).name;
}
