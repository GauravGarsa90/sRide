import * as connect from 'connect';
import * as http from 'http';
import * as swaggerTools from 'swagger-tools';
const app = connect();
var serverPort = 3000;

// swaggerRouter configuration
var options = {
  controllers: './lib/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const swaggerDoc = require('./swagger.json');

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});



// import * as express from 'express';
// import * as SwaggerParser from 'swagger-parser';
// import { connector } from 'swagger-routes-express';
// import * as controller from './controllers';
// import * as swaggerTools from 'swagger-tools';
// const port = 3000;
// // const express = require('express');
// // const SwaggerParser = require('swagger-parser');
// // const swaggerRoutes = require('swagger-routes-express');
// // const controller = require('./controllers');
// console.log('hello');
// (async () => {
//   const parser = new SwaggerParser();
//   const apiDescription = await parser.validate('swagger.yml');
//   const connect = connector(controller, apiDescription);
//   const app = express();
//   swaggerTools.initializeMiddleware('./swagger.yml', (middleware) => {
//     app.use(middleware.swaggerMetadata());
//     app.use(middleware.swaggerValidator());
//     app.use(middleware.swaggerRouter());
//     app.use(middleware.swaggerUi());
//     app.listen(port, ()=>{
//       console.log('server running at http://localhost:' + port + '/')
//     });
//   })
//   // connect(app);
//   // return app;
// })();
// // .then(app => app.listen(port))
// //   .then(() => {
// //     console.log('Server started');
// //   })
// //   .catch(err => {
// //     console.error('caught error', err);
// //   })