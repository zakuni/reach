import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const theme = createMuiTheme();

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

render(<Root />, document.getElementById('root'));
