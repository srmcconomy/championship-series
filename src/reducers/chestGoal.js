import { Map, List } from 'immutable';

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'set-chests':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new List());
      }
      return state.updateIn([action.twitch, action.index], obj => ({ chests: action.chests, dungeon: action.dungeon }));
    case 'remove-chests':
      if (!state.has(action.twitch)) {
        return;
      }
      return state.update(action.twitch, list => list.take(action.index));
    case 'remove-player':
      return state.delete(action.twitch);
    case 'set-state':
      return action.newState;
    default:
      return state;
  }
}
