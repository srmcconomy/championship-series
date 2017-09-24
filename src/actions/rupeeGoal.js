export function acquireRupees(twitch, amount) {
  return {
    type: 'acquire-rupees',
    twitch,
    amount,
  };
}

export function spendRupees(twitch, amount) {
  return {
    type: 'spend-rupees',
    twitch,
    amount,
  };
}

export function setWallet(twitch, amount) {
  return {
    type: 'set-wallet',
    twitch,
    amount,
  };
}

export function removePlayer(twitch) {
  return {
    type: 'remove-player',
    twitch,
  };
}
