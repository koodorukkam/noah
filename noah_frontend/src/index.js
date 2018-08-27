import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from './store';
import HomeView from './components/home'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
        <Route component={HomeView} />
    </Router>
  </Provider>,
  document.getElementById('app')
);