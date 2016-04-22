var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var Agenda = require('agenda');

var routes = require('./routes/index');
var users = require('./routes/users');

var apiAgenda = require('./controllers/api/agenda/apiAgenda');

var WIFISwitch = require('./models/wifiswitch');
var application_root = __dirname,
    path = require("path");
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');
 
app.use(favicon('public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/users', users);

app.use('/api/agenda', apiAgenda);

var agenda = new Agenda({db: {address: 'localhost:27017/agenda-example'}});

agenda.define('greet the world', function(job, done) {
	job.attrs.data.num = job.attrs.data.num+1;
  console.log(job.attrs.data.num, 'hello world!');
  done();
});

agenda.define('view jobs', function(job, done) {
	agenda.jobs({}, function(err, jobs) {
	  console.log(jobs);
	});
	done();
});

agenda.on('ready', function() {
	agenda.cancel({}, function(err, numRemoved) {
	});
/* 	agenda.every('10 seconds', 'greet the world', {num: 0});	
	agenda.start();
	agenda.jobs({}, function(err, jobs) {
	  console.log(jobs);
	}); */
	
});



// Connect to the beerlocker MongoDB
// mongoose.connect('mongodb://localhost:27017/wihome');
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
/// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 
module.exports = app;