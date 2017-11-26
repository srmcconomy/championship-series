import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import socketMiddleware from './util/clientSocketMiddleware';
import reducers, { EnemyRecord } from './reducers/enemyGoal';
import { Map, List } from 'immutable';

import Admin from './components/Admin';

const socket = io();

const stateFromJS = json => new Map(
  Object.keys(json).map(key => {
    const rec = {}
    Object.keys(json[key]).forEach(dungeon => {
      rec[dungeon] = new Map(Object.keys(json[key][dungeon]).map(enemy => [enemy, json[key][dungeon][enemy]]))
    });

    return [key, new EnemyRecord(rec)];
  })
);

const initialState = stateFromJS(window.INITIAL_STATE);

const store = createStore(reducers, initialState, applyMiddleware(socketMiddleware(socket, stateFromJS)));

const render = () => {
  const registry = {}
  const app = (
    <Provider store={store}>
      <Admin />
    </Provider>
  );
  ReactDOM.render(app, document.getElementById('react-root'));
}

render();

if (module.hot) {
  module.hot.accept('./components/Admin', () => { render() });
}
