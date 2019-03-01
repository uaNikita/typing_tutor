const _ = require('lodash');
const crypto = require('crypto');
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
  setAnonymousToken,
  init,
  getData,
  defaults,
  defaultsWhichCanBeOverwrittenByLS,
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

const { app, server } = require('./server');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../dist/favicon.png')));
app.use(express.static(path.join(__dirname, '../dist')));

// Passport
require('./passport')(app);

app.use('/', require('./controllers'));

app.get('*', async (req, res) => {
  const {
    tt_access: accessCookie,
    tt_refresh: refreshCookie,
    tt_anonymous: anonymousCookie,
    tt_temp: tempCookie,
    tt_ls: lsCookie,
  } = req.cookies;

  // read info from tt_temp cookie and add it to store
  let stateFromCookie = {};
  const objectsToMerge = [{}, defaults];

  if (tempCookie) {
    stateFromCookie = LZString.decompressFromEncodedURIComponent(tempCookie);

    stateFromCookie = JSON.parse(stateFromCookie);

    objectsToMerge.push(stateFromCookie);
  }

  if (!lsCookie) {
    objectsToMerge.push(defaultsWhichCanBeOverwrittenByLS);
  }

  // if value is array then replace array with new
  const mergedState = _.mergeWith(...objectsToMerge, (objValue, srcValue) => {
    let result;

    if (_.isArray(objValue)) {
      result = srcValue;
    }

    return result;
  });

  // create store
  const store = createStore(
    reducer,
    Immutable.fromJS(mergedState),
    applyMiddleware(thunk),
  );
  const { dispatch } = store;

  // get all info for authorized users
  if (refreshCookie) {
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
  else {
    let token;

    if (anonymousCookie) {
      token = anonymousCookie;
    }
    else {
      token = crypto.randomBytes(8).toString('hex');

      res.cookie('tt_anonymous', token);
    }

    dispatch(setAnonymousToken(token));
  }

  // initialize some parts of store, for example syllable lessons
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

// errors
require('./errors')(app);

server.listen(config.get('port'));
