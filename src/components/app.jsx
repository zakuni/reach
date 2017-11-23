import React from 'react';
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/index' component={Index} />
      <Route path='/new' component={Editor} />
      <Route path='/:report' component={Editor} />
    </Switch>
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
      <li key={report._id}>{report.title}</li>
    );
    return(
      <div>
        <Link to='/new'>new</Link>
        <ul>{reportItems}</ul>
      </div>
    );
  }
}

import request from 'superagent';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      titleChanged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({titleChanged: false});
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  async handleSubmit(event) {
    event.preventDefault();
    const response = await request.post('/api/reports')
      .send({title: this.state.value})
      .set('accept', 'json')
      .withCredentials();
    const report = response.body;
    this.setState({titleChanged: true});
  }
  render() {
    const { titleChanged } = this.state;
    if (titleChanged) {
      return(
        <Redirect to={`/${this.state.value}`}/>
      );
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <input type='submit' value='submit' />
      </form>
    );
  }
}

export default App;
