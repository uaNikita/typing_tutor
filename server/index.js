const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('database'), {
  useMongoClient: true,
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', function(req, res) {
  res.render('index', {
    title: 'Typing tutor'
  });
});

app.use(session({
  secret: config.get('secretKey'),
  resave: false,
  saveUninitialized: false
}));

// Passport
require('./passport')(app);

let routes = require('./routes/index');
app.use('/', routes);

// Errors
require('./errors')(app);

app.listen(config.get('port'));
