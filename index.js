#!/usr/bin/env node
const http = require("http");
const dotenv = require("dotenv");

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
 * App initialize
 */
var app = require("./server/app");

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
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log("CONNECTED");
    socket.on('disconnect', function(){
        console.log("DISCONNECTED");
    });
});

app.set('io', io);

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
