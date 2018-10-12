const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const LZString = require('lz-string');
const Immutable = require('immutable');
const { Helmet } = require('react-helmet');
const { renderToString } = require('react-dom/server');

require('isomorphic-fetch');

const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
const config = require('config');

const {
  app: compiledApp,
  reducer,
  setRefreshToken,
  setAccessToken,
  init,
  getData,
  defaults,
} = require('../dist/compiledServer');

mongoose.Promise = global.Promise;

const mongoURI = (() => {
  const {
    username,
    password,
    host,
    port,
    name,
  } = config.get('database');

  let credentials = '';

  if (username && password) {
    credentials = `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
  }

  return `mongodb://${credentials}${host}:${port}/${name}`;
})();

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoURI}`);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../dist/favicon.png')));
app.use(express.static(path.join(__dirname, '../dist')));

// Passport
require('./passport')(app);

app.use('/', require('./controllers'));

app.use(async (req, res) => {
  const {
    tt_access: accessCookie,
    tt_refresh: refreshCookie,
    tt_temp: tempCookie,
  } = req.cookies;


  let store;
  let dispatch;

  // non authorized users
  if (tempCookie) {
    // read info from tt_temp cookie and add it to store
    let stateFromCookie = LZString.decompressFromEncodedURIComponent(tempCookie);

    stateFromCookie = JSON.parse(stateFromCookie);

    // if value is array then replace array with new
    const mergedState = _.mergeWith({}, defaults, stateFromCookie, (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return srcValue;
      }
    });

    // create store
    store = createStore(reducer, Immutable.fromJS(mergedState), applyMiddleware(thunk));
    dispatch = store.dispatch;
  }
  // authorized users
  else {
    store = createStore(reducer, Immutable.fromJS(defaults), applyMiddleware(thunk));
    dispatch = store.dispatch;

    if (accessCookie) {
      dispatch(setAccessToken(accessCookie));
      dispatch(setRefreshToken(refreshCookie));

      await dispatch(getData({
        responseFromServer: res,
      }))
        .then(({ ok }) => {
          if (!ok) {
            res.clearCookie('tt_refresh');
            res.clearCookie('tt_access');
            res.clearCookie('tt_temp');
          }
        })
        .catch(() => {});
    }
  }

  // initialize some parts of store, for example learning lessons
  dispatch(init());

  const context = {};

  const html = renderToString(compiledApp(req.url, context, store));

  const { url } = context;

  if (url) {
    res.status(301).set('Location', url);

    res.end();
  }
  else {
    const {
      title,
      meta,
      link,
      script,
    } = Helmet.renderStatic();

    res.send(
      `<!doctype html>
           <html>
             ${title.toString()}
             ${meta.toString()}
             ${link.toString()}
             <script>
               // WARNING: See the following for security issues around embedding JSON in HTML:
               // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
               window.PRELOADED_STATE = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
             </script>
             ${script.toString()}
             <div id="root" class="layout">${html}</div>
          </html>`,
    );
  }
});

// Errors
require('./errors')(app);

app.listen(config.get('port'));
