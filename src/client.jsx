import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import App from './components/app.jsx';

const Root = () => (
  <Router>
    <App/>
  </Router>
);

hydrate(<Root />, document.getElementById('root'));
