const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Helmet = require('react-helmet').Helmet;
const renderToString = require('react-dom/server').renderToString;

const compiledServer = require('../dist/compiledServer');
const store = compiledServer.store;
const compiledApp = compiledServer.app;

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

app.use('/', require('./routes/index'));

app.use((req, res) => {
  const context = {};

  if (context.url) {
    res.status(301).set('Location', context.url);

    res.end();
  } else {
    const helmet = Helmet.renderStatic();

    res.send(`
    <!doctype html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.script.toString()}
        ${helmet.link.toString()}
      </head>
      <body>
        <div id='root'>${renderToString(compiledApp(req.url, context))}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.PRELOADED_STATE = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="/main.js"></script>
      </body>
    </html>
    `);
  }
});


// Errors
require('./errors')(app);

app.listen(config.get('port'));
