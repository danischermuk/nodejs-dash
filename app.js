/****************************DEPENDENCIAS Y MODULOS****************************/
var express         = require('express');
var app             = express();
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require("method-override");
var mongoose        = require('mongoose');
var Agenda          = require('agenda');
var passport        = require('passport');
var dgram           = require('dgram');
var udpServer       = dgram.createSocket('udp4');
var server          = require('http').Server(app);
var io              = require('socket.io')(server);
var debug = require('debug')('nodeangular:server');
// Definicion del path
var application_root = __dirname;

/****************************MODELOS****************************/
var User            = require('./models/user');
var Building        = require('./models/building');
var Appliance       = require('./models/appliance');
var ApplianceGroup  = require('./models/ApplianceGroup');


// Route del index
var routes          = require('./routes/index');

/****************************CONTROLLERS****************************/
// Routes de la API
var api             = require('./controllers/api');
// Inicialización de la aplicación
var Init            = require('./controllers/init');

var emitIO            = require('./controllers/emitIO');
emitIO.init(io);
// Aplpiance Controller
var applianceController = require('./controllers/appliance');

/****************************APLICACION****************************/
 // Declaracion de la aplicacion
app.disable('x-powered-by');
 // Use the passport package in our application
app.use(passport.initialize());
// view engine setup
app.set     ('views', path.join(__dirname, 'views'));
app.engine  ("html", require("ejs").renderFile);
app.set     ('view engine', 'html');
 
app.use(favicon('public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Direccion de los paquetes de BOWER
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Direccion de las Routes
app.use('/', routes);
app.use('/api', api);

// Inicializamos la aplicación
Init.initMongoDB();
Init.initUsers  ();
Init.initBuilding();


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
 





var port = normalizePort(process.env.PORT || '3333');
app.set('port', port);


io.on('connection', function(client){
  console.log("io connection");
  client.on('event', function(data){console.log("io EVENT" + data);client.emit('messages', 'mensaje del socket');});
  client.on('disconnect', function(){console.log("io DISconnection");});

});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}






udpServer.on('listening', function () {
    var address = udpServer.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

udpServer.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    
    try {
        var hb = JSON.parse(message);
        applianceController.heartBeatCheck(hb);
    } catch (e) {
        console.log (message);
    }

});

udpServer.bind(6789, () => {
    udpServer.setBroadcast(true);
});


module.exports = app;