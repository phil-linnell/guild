export function getWinner(array) {
  return Math.max.apply(Math, array.map(player => player.points));
}
