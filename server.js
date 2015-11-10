'use strict';

var express = require('express'),
    http = require('http'),
    exports,
    app = express(),
    port = 3000,
    path = require('path'),
    server = http.createServer(app);

if(app.get('env') === 'development'){
  app.set('appPath', __dirname + '/client');
  app.use('/bower_components', express.static( app.get('appPath') + '/bower_components'));
  app.use('/', express.static(__dirname + '/client'));
}
if(app.get('env') === 'production'){
  app.set('appPath', __dirname + '/dist');
  app.use('/', express.static(__dirname + '/dist'));
}


// use EJS just to get Express to serve HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require('./server/routes')(app);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
server.listen(port, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});
exports = module.exports = app;