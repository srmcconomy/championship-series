import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Login from './components/Login';

const render = () => {
  const registry = {}
  const app = (
    <Login />
  );
  ReactDOM.render(app, document.getElementById('react-root'));
}

render();

if (module.hot) {
  module.hot.accept('./components/Login', () => { render() });
}
