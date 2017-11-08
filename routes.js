const Router = require('koa-router');
const router = new Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const App = require('./src/components/app.jsx').default;

// eslint-disable-next-line no-unused-vars
router.get('/', async function (ctx, next) {
  const content = ReactDOMServer.renderToString(
    <StaticRouter
      location={ctx.request.URL}
      context={ctx}
    >
      <App/>
    </StaticRouter>
  );

  await ctx.render('index', {
    content: content
  });
});

export default router;
