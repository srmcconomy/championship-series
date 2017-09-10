export function setGoal(twitch, index, value) {
  return {
    type: 'set',
    twitch,
    index,
    value,
  };
}
