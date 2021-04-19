const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);
const port = process.env.PORT || 3001;
var userList = {};

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("username-request");

  socket.on("username-response", (response) => {
    userList[socket.handshake.issued] = response;
    socket.emit("user-list", userList);
  });
  socket.on("disconnect", () => {
    delete userList[socket.handshake.issued];
    console.log("Client disconnected");
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
