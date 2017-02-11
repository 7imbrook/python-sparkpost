import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import Layout from './components/Layout';

import '../scss/app.scss';

if (module.hot) module.hot.accept();

window.onload = () => {
  render(
    <Provider store={store}>
      <Layout />
    </Provider>,
    document.getElementById('react'),
  );
};
