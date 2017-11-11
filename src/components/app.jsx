import React from 'react';
import {
  Route
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const App = () => (
  <div>
    <Route exact path='/' component={Login} />
    <Route path='/index' component={Index} />
  </div>
);

const Login = () => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Grid container justify={'center'} align={'center'} style={{marginTop: '200px'}}>
        <Grid item>
          <h1>Reach</h1>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify={'center'} align={'center'} style={{height: '0px'}}>
        <Grid item>
          <Button color="primary" className='loginbutton' href='/auth/google'>
            sign in with google
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };
  }
  async componentDidMount() {
    const response = await fetch('/api/reports', {credentials: 'include'});
    const reports = await response.json();
    this.setState({reports: reports});
  }
  render() {
    const reportItems = this.state.reports.map((report) =>
      <li key={report._id}>{report.updatedAt}</li>
    );
    return(
      <ul>{reportItems}</ul>
    );
  }
}

export default App;
