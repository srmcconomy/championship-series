import { generate as id } from 'shortid';

const resolves = {};

export default function (socket, stateFromJS) {
  return store => {
    socket.on('dispatch', action => {
      action.from = 'server';
      store.dispatch(action);
    });
    socket.on('set-state', newState => {
      newState = stateFromJS(newState);
      store.dispatch({ type: 'set-state', from: 'server', newState })
    })
    return next => async action => {
      if (action.from === 'server') {
        if (action.type === 'ack' && resolves.hasOwnProperty(action.id)) {
          resolves[action.id](action);
          delete resolves[action.id];
        }
        next(action);
      } else {
        action.id = id();
        action.from = 'client';
        socket.emit('dispatch', action);
        await new Promise(res => {
          resolves[action.id] = res;
        });
        next(action);
      }
    }
  }
}
