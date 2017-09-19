const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const Helmet = require('react-helmet').Helmet;
const renderToString = require('react-dom/server').renderToString;

require('isomorphic-fetch');

const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

const {
  app: compiledApp,
  reducer,
  setRefreshToken,
  setAccessToken,
  getUserData
} = require('../dist/compiledServer');

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
app.use(favicon(path.join(__dirname, '../dist/favicon.ico')));
app.use(express.static(path.join(__dirname, '../dist')));

// Passport
require('./passport')(app);

app.use('/', require('./routes'));

app.use((req, res) => {
  const context = {};

  const store = createStore(reducer, applyMiddleware(thunk));
  const { dispatch } = store;


  new Promise((resolve, reject) => {
    const { tt_refresh, tt_access } = req.cookies;

    if (tt_refresh) {
      dispatch(setRefreshToken(tt_refresh));

      if (tt_access) {
        dispatch(setAccessToken(tt_access));
      }

      dispatch(getUserData())
        .then(resolve, resolve);
    }

  })
    .then(() => {
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
                          window.PRELOADED_STATE = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
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


});


// Errors
require('./errors')(app);

app.listen(config.get('port'));
