import { Map, Record } from 'immutable';

export const RupeeRecord = new Record({ acquired: 0, spent: 0, wallet: 99 });

export default function (state = new Map(), action) {

  switch (action.type) {
    case 'acquire-rupees':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new RupeeRecord());
      }
      if (action.amount) {
        return state.updateIn([action.twitch, 'acquired'], n => Math.min(state.get(action.twitch).wallet, n + action.amount));
      }
      return state.setIn([action.twitch, 'acquired'], 0);
    case 'spend-rupees':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new RupeeRecord());
      }
      if (action.amount) {
        return state.updateIn([action.twitch, 'acquired'], n => n - action.amount)
          .updateIn([action.twitch, 'spent'], n => n + action.amount);
      }
      return state.setIn([action.twitch, 'spent'], 0);
    case 'set-wallet':
      if (!state.has(action.twitch)) {
        state = state.set(action.twitch, new RupeeRecord());
      }
      return state.setIn([action.twitch, 'wallet'], action.amount);
    case 'remove-player':
      return state.delete(action.twitch);
    default:
      return state;
  }
}
