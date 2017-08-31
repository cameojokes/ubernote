const restify = require('restify');
const Router = require('restify-routify');
const ridesEstimatesApi = require('./api/rides/estimates');

const app = restify.createServer();

app.use(restify.plugins.queryParser());

const ridesRouter = new Router('rides');
const ridesEstimatesRouter = new Router('estimates');

ridesEstimatesRouter
  .get(ridesEstimatesApi.get);

ridesRouter.extend(ridesEstimatesRouter);

ridesRouter.routify(app);

app.get('/', restify.plugins.serveStatic({
  directory: './public',
  file: 'index.html',
}));

// eslint-disable-next-line no-console
app.listen(80, () => console.log('Started...'));
