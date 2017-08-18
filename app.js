let express = require('express');
let path = require('path');
let logger = require('morgan');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');

let app = express();

// handlebars view engine setup
app.engine('hbs', exphbs({extname: 'hbs', helpers: require('./lib/hbs-helpers')}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  //Handle ENOENT errors
  if(err.code === 'ENOENT' && err.path.indexOf('default.json') != -1){
    err.details = 'If no path is specified, this program uses `default.json` for data.  Either rename your data file to default.json or specify the filename in the query params';
  }
  res.render('error', err);
});

module.exports = app;
