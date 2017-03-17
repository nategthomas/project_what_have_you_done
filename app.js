var express = require('express');
var bodyParser = require('body-parser');
var hbs =require('handlebars');


var index = require('./routes/index.js');
var legislators = require('./routes/legs.js');


var app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/'}));
app.set('view engine', 'hbs');



app.use('/', index);
app.use('/legislators', legislators);

app.use(express.static(path.join(__dirname, 'public')));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error');
});

const port = process.env.PORT || '3000';

app.listen(port);


exports.module = app;
