const express = require('express');
const path = require('path');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const hbsHelpers = require('./lib/hbs-helpers');

const app = express();

// handlebars view engine setup
app.engine('hbs', exphbs({ extname: 'hbs', helpers: hbsHelpers }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  // Handle ENOENT errors
  if (err.code === 'ENOENT' && err.path.indexOf('default.json') !== -1) {
    err.details = 'If no path is specified, this program uses `default.json` for data.  Either rename your data file to default.json or specify the filename in the query params'; // eslint-disable-line no-param-reassign
  }
  res.render('error', err);
});

module.exports = app;
