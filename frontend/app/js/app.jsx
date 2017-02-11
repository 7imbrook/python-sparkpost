import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import recognition from './recognition';

import '../scss/app.scss';

if (module.hot) module.hot.accept();

window.onload = () => {
  render(
    <Provider store={store}>
      <h1> Hello World </h1>
    </Provider>,
    document.getElementById('react'),
  );
};
