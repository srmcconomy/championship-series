export function toggleEnemy(twitch, dungeon, enemy, value) {
  return {
    type: 'toggle-enemy',
    twitch,
    dungeon,
    enemy,
    value,
  };
}

export function removePlayer(twitch) {
  return {
    type: 'remove-player',
    twitch,
  };
}
