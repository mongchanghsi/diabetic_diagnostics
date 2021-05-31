import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import UserDetailsPage from './pages/UserDetails';
import ANPage from './pages/AN';
import FootPage from './pages/Foot';
import ResultsPage from './pages/Results';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/userdetails' exact component={UserDetailsPage} />
      <Route path='/an' exact component={ANPage} />
      <Route path='/foot' exact component={FootPage} />
      <Route path='/result' exact component={ResultsPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
