import * as connect from 'connect';
import * as http from 'http';
import * as swaggerTools from 'swagger-tools';
const swaggerDoc = require('./swagger.json');
const app = connect();
var serverPort = 3000;

var options = {
  controllers: './lib/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false
};


swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});
