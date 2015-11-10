'use strict';

var error = require('./error');

module.exports = function(app) {

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //   .get(error[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile('index.html', { root: app.get('appPath') });
    });
};