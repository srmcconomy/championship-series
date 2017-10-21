import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import socketMiddleware from './util/clientSocketMiddleware';
import reducers from './reducers/chestGoal';
import { Map, List } from 'immutable';

import Leaderboard from './components/Leaderboard';

const stateFromJS = (json) => new Map(
  Object.keys(json).map(key => [key, new List(json[key])])
);

const socket = io();

const initialState = stateFromJS(window.INITIAL_STATE);

const store = createStore(reducers, initialState, applyMiddleware(socketMiddleware(socket, stateFromJS)));

const render = () => {
  const registry = {}
  const app = (
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  );
  ReactDOM.render(app, document.getElementById('react-root'));
}

render();

if (module.hot) {
  module.hot.accept('./components/Leaderboard', () => { render() });
}
