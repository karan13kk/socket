#!/usr/bin/env node
const http = require("http");
const dotenv = require('dotenv');
const cors   = require('cors');
const sockets= require('./server/io');
var app      = require("./server/app");

// process errors
process.on("uncaughtException", function(err) {
  console.log("uncaughtException : ", err);
  process.exit(1);
});

process.on("unhandledRejection", function(err) {
  console.log("unhandledRejection : ", err);
  process.exit(1);
});

// config setup
dotenv.config();

/**
 * Middleware setup
 */
app.use(cors);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
server.listen(process.env.PORT);
server.on("error", onError);
server.on("listening", onListening);

/**
 * IO setup
 */
sockets.socketServer(server);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
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
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}