import React from 'react';
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const App = () => (
  <div>
    <AppBar position='absolute' color='default' style={{boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)'}}>
      <Toolbar>
        <a href='/index'
          style={{
            color: 'rgba(0, 0, 0, 0.87)',
            textDecoration: 'none'
          }}
        >
          <h3 style={{marginLeft: '24px'}}>Reach</h3>
        </a>
      </Toolbar>
    </AppBar>
    <div style={{paddingTop: '100px', marginLeft: '48px'}} >
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/index' component={Index} />
        <Route path='/new' component={Editor} />
        <Route path='/:report' component={Editor} />
      </Switch>
    </div>
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
      <li key={report._id}><Link to={report.title}>{report.title}</Link></li>
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
    const report_title = props.match.params.report;
    this.state = {
      report: null,
      value: report_title || '',
      titleChanged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    if (this.state.value !== '') {
      const response = await request.get(`/api/reports/${this.state.value}`).withCredentials();
      const report = response.body;
      this.setState({report: report, value: report.title});
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({titleChanged: false});
  }
  handleChange(event) {
    let report = this.state.report;
    if (report) {
      report.title = event.target.value;
    }
    this.setState({report: report, value: event.target.value});
  }
  async handleSubmit(event) {
    event.preventDefault();
    let report = this.state.report;
    if (report) {
      const response = await request.put('/api/reports')
        .send({id: report._id, title: report.title})
        .set('accept', 'json')
        .withCredentials();
      report = response.body;
    } else {
      const response = await request.post('/api/reports')
        .send({title: this.state.value})
        .set('accept', 'json')
        .withCredentials();
      report = response.body;
    }
    this.setState({report: report, titleChanged: true});
  }
  render() {
    const { report, titleChanged } = this.state;
    if (titleChanged) {
      return(
        <Redirect to={`/${this.state.value}`}/>
      );
    }
    const reached = report ? <div>{report.reached.length} reached</div> : '';
    const createdAt = report ? <div>created at: {report.createdAt}</div> : '';
    const updatedAt = report ? <div>updated at: {report.updatedAt}</div> : '';
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.value} onChange={this.handleChange} />
          <input type='submit' value='submit' />
        </form>
        {reached}
        {createdAt}
        {updatedAt}
      </div>
    );
  }
}

export default App;
