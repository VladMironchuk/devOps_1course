'use strict';

var appRoot = require('app-root-path');
var reqlib = appRoot.require;

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const swStats = require('swagger-stats');
const apiSpec = reqlib('api/swagger/openapi.json')

const path = require('path');
var app = express();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

// to serve docs
app.use(express.static(path.join(__dirname, 'public')));

// to expose health check 
app.use('/health', require('express-healthcheck')());

// we don't integrate morgan or swagger-logger to winston here yet

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // allow swagger-stats microservice monitoring by http://localhost:10011/swagger-stats/ux#/
  app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));

  // install middleware
  swaggerExpress.register(app);

  //var port = process.env.PORT || 8081;
  var port = 9991;
  app.listen(port);

	console.log('check this to see docs :\n  http://127.0.0.1:' + port + '/');
  
  if (swaggerExpress.runner.swagger.paths['/subscription/categories']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/premiere/list');
  }
});
