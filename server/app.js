const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/config');
const routes = require('./routes');
const cors = require('cors');
require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.info('Database connected successfully..! ');
}, (error) => { 
    console.warn('Could not connected to database : ' + error);
});

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => { res.send('Page under construction.'); });
app.post('/', (req, res) => { res.send('Page under construction.'); });
app.get('/email', (req, res) => { 
  res.render("thankContactUs.ejs", { name: "UserName", subject: "Subject" })
});
app.use('/api', routes);
app.use((req, res) => { res.send('Invalid Url.'); });

module.exports = app;
