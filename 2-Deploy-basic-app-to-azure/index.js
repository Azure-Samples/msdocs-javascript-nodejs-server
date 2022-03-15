import express from 'express';
import configureHttpServer from './services/httpserver.js';

// Create express app
const app = express();

// Establish port
const port = process.env.PORT || 8080;

// Global Error Handler
const onGlobalErrors = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
};

// Create web server
configureHttpServer(app).then((webserver) => {
  webserver.on('error', onGlobalErrors);
  webserver.listen(port, '0.0.0.0', () => console.log(`Server listening on port: ${port}`));
});
