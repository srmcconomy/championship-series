import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Map, List } from 'immutable';
import socketMiddleware from './util/clientSocketMiddleware'
import io from 'socket.io-client';
import { Provider } from 'react-redux';

import App from './components/HeartGoal';
import reducers, { HeartsRecord } from './reducers/heartGoal';

const stateFromJS = (json) => new Map(
  Object.keys(json).map(key => [key, new HeartsRecord(json[key])])
);

const socket = io();
let dirty = false;

const initialState = stateFromJS(window.INITIAL_STATE);

const store = createStore(reducers, initialState, applyMiddleware(socketMiddleware(socket, stateFromJS)));

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
  module.hot.accept('./components/HeartGoal', () => { render() });
}
