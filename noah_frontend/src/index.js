import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from './store';
import HomeView from './components/home'
import DonationSteps from './components/donationsteps'
import TermsConditons from './components/termsconditions'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/how-to-donate" component={DonationSteps} />
        <Route exact path="/terms-and-conditions" component={TermsConditons} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
