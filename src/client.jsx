import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import App from './components/app.jsx';

const Root = () => (
  <Router>
    <App/>
  </Router>
);

render(<Root />, document.getElementById('root'));
