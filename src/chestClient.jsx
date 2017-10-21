import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Map, List } from 'immutable';
import socketMiddleware from './util/clientSocketMiddleware'
import io from 'socket.io-client';
import { Provider } from 'react-redux';

import App from './components/ChestGoal';
import reducers from './reducers/chestGoal';

const socket = io();

const initialState = new Map(
  Object.keys(window.INITIAL_STATE).map(key => [key, new List(window.INITIAL_STATE[key])]),
);

const store = createStore(reducers, initialState, applyMiddleware(socketMiddleware(socket)));

const render = () => {
  const registry = {}
  const app = (
    <Provider store={store}>
      <App twitch={window.USER} />
    </Provider>
  );
  ReactDOM.render(app, document.getElementById('react-root'));
}

render();

if (module.hot) {
  module.hot.accept('./components/ChestGoal', () => { render() });
}
