const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);
const port = process.env.PORT || 3001;
var interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getDate(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("button-message", () => {
    console.log("recieved");
    socket.emit("alert-message", "hello from server");
  });
});

const getDate = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("date", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
