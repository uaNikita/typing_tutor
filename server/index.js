const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Helmet = require('react-helmet').Helmet;
const renderToString = require('react-dom/server').renderToString;

const compiledServer = require('../dist/compiledServer');
const compiledApp = compiledServer.app;
const createStore = compiledServer.createStore;
const reducer = compiledServer.reducer;

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
const config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('database'), {
  useMongoClient: true,
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

// Passport
require('./passport')(app);

app.use('/', require('./routes'));

app.use((req, res) => {
  const context = {};

  const store = createStore(reducer);

  const html = renderToString(compiledApp(req.url, context, store));

  if (context.url) {
    res.status(301).set('Location', context.url);

    res.end();
  }
  else {
    const { title, meta, link, script } = Helmet.renderStatic();

    res.send(`
      <!doctype html>
      <html>
        <head>
          ${title.toString()}
          ${meta.toString()}
          ${link.toString()}
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(createStore(reducer).getState()).replace(/</g, '\\u003c')}
          </script>
          ${script.toString()}
        </head>
        <body>
          <div id='root'>${html}</div>
        </body>
      </html>
    `);
  }
});


// Errors
require('./errors')(app);

app.listen(config.get('port'));
