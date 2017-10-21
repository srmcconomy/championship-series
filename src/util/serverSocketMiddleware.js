export default function (io) {
  return store => {
    io.on('connection', socket => {
      console.log(store.getState());
      socket.emit('set-state', store.getState().toJS())
      socket.on('dispatch', action => {
        console.log(action);
        action.from = socket;
        store.dispatch(action);
      });
    });
    return next => action => {
      const socket = action.from;
      action.from = 'server';
      socket.emit('dispatch', { id: action.id, type: 'ack' });
      socket.broadcast.emit('dispatch', action);
      next(action);
    };
  }
}
