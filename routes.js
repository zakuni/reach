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
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/index');
  }

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

// eslint-disable-next-line no-unused-vars
router.get(['/index', '/new', '/:report'], async function (ctx, next) {
  if (ctx.isUnauthenticated()) {
    return ctx.redirect('/');
  }

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

const Report = require('./models/report');

async function requireAuth(ctx, next) {
  if (ctx.isUnauthenticated()) {
    return ctx.status = 401;
  }
  return next();
}

router.post('/api/reports', requireAuth,
  async (ctx) => {
    const title = ctx.request.body.title;
    const report = await Report.create({ title: title, author: ctx.state.user });
    ctx.body = report;
  }
);

router.get('/api/reports', requireAuth,
  async (ctx) => {
    const reports = await Report.find({});
    ctx.body = reports;
  }
);

router.get('/api/reports/:title', requireAuth,
  async (ctx) => {
    const title = ctx.params.title;
    const report = await Report.findOne({ title: title });
    ctx.body = report;
  }
);

router.put('/api/reports', requireAuth,
  async (ctx) => {
    const id = ctx.request.body.id;
    const title = ctx.request.body.title;
    // not using update() nor findOneAndUpdate() since they have several caveats with validation in Mongoose 4.x
    let report = await Report.findOne({ _id: id });
    report.title = title;
    report = await report.save();
    ctx.body = report;
  }
);

export default router;
