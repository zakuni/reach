import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import App from './components/app.jsx';

const theme = createMuiTheme();

const Root = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  </Router>
);

hydrate(<Root />, document.getElementById('root'));
