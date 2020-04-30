import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AppProvider } from './AppContext';
import Login from './Login';
import Restaurants from './Restaurants';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <AppProvider>
    <Router>
      <ProtectedRoute exact path="/" component={Restaurants} />
      <Route exact path="/login" component={Login} />
    </Router>
  </AppProvider>
);

export default App;
