export function addFullHeart(twitch) {
  return {
    type: 'add-full',
    twitch,
  };
}

export function addHeartPiece(twitch) {
  return {
    type: 'add-piece',
    twitch,
  };
}

export function removeHeart(twitch) {
  return {
    type: 'remove-heart',
    twitch,
  };
}

export function removePlayer(twitch) {
  return {
    type: 'remove-player',
    twitch,
  };
}
