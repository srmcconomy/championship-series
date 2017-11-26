import { Map, Record } from 'immutable';

export const EnemyRecord = new Record({
  'Bottom of the Well': new Map(),
  'Shadow Temple': new Map(),
  "Dodongo's Cavern": new Map(),
  'Forest Temple': new Map(),
  'Spirit Temple': new Map(),
});

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'toggle-enemy':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new EnemyRecord());
      }
      return state.setIn([action.twitch, action.dungeon, action.enemy], action.value);
    case 'remove-player':
      return state.delete(action.twitch);
    case 'set-state':
      return action.newState;
    default:
      return state;
  }
}
