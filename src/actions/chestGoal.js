export function setChests(twitch, index, dungeon, chests) {
  return {
    type: 'set-chests',
    twitch,
    index,
    dungeon,
    chests,
  };
}

export function removeChests(twitch, index) {
  return {
    type: 'remove-chests',
    twitch,
    index,
  };
}

export function removePlayer(twitch) {
  return {
    type: 'remove-player',
    twitch,
  };
}
