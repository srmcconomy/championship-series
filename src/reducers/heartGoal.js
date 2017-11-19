import { Map, Record } from 'immutable';

export const HeartsRecord = new Record({ full: 0, piece: 0 });

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'add-full':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new HeartsRecord());
      }
      return state.updateIn([action.twitch, 'full'], full => full + 1);
    case 'add-piece': {
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new HeartsRecord());
      }
      const pieces = state.get(action.twitch).piece;
      if (pieces >= 3) {
        state = state.updateIn([action.twitch, 'full'], full => full + 1);
        return state.setIn([action.twitch, 'piece'], 0);
      }
      return state.updateIn([action.twitch, 'piece'], piece => piece + 1);
    }
    case 'remove-heart': {
      if (!state.has(action.twitch)) {
        return;
      }
      const pieces = state.get(action.twitch).piece;
      if (pieces) return state.setIn([action.twitch, 'piece'], 0);
      return state.updateIn([action.twitch, 'full'], full => Math.max(0, full - 1));
    }
    case 'remove-player':
      return state.delete(action.twitch);
    case 'set-state':
      return action.newState;
    default:
      return state;
  }
}
