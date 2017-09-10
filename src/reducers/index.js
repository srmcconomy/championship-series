import { Map, List } from 'immutable';

const init = new List([...Array(25)].map(() => false));

export default function(state = new Map(), action) {
  switch (action.type) {
    case 'set':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, init)
      }
      return state.setIn([action.twitch, action.index], action.value);
    default:
      return state;
  }
}
