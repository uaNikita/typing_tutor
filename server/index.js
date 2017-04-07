let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let mongoose = require('mongoose');
let config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('database'));
mongoose.connection.on('error', () => {
   throw new Error(`unable to connect to database: ${config.db}`);
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', function (req, res) {
   res.render('index', {
      title: 'Typing tutor'
   });
});

// app.use(session({
//    secret: 'white cat',
//    resave: false,
//    saveUninitialized: false
// }));
//
// // Passport
// require('./passport')(app);
//
// /* GET home page. */
// app.get('/', function(req, res, next) {
//    res.render('index', { title: 'Express' });
// });
//
//
// app.get('/test-page', function(req, res) {
//    res.render('test-page');
// });
//
// let routes = require('./routes/index');
// app.use('/api', routes);
//
//
// // Errors
// require('./errors')(app);

app.listen(3000);
