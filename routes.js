const Router = require('koa-router');
const router = new Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const App = require('./src/components/app.jsx').default;

const sheetsRegistry = new SheetsRegistry();
const theme = createMuiTheme();
const jss = create(preset());

// eslint-disable-next-line no-unused-vars
router.get('/', async function (ctx, next) {
  const content = ReactDOMServer.renderToString(
    <StaticRouter
      location={ctx.request.URL}
      context={ctx}
    >
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <App/>
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );
  const css = sheetsRegistry.toString();

  await ctx.render('index', {
    content: content,
    css: css
  });
});

export default router;
