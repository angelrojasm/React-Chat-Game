const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);
const port = process.env.PORT || 3001;
var userList = {};
var messageList = [];

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("username-request");
  socket.join("game-room");

  socket.on("username-response", (response) => {
    userList[socket.handshake.issued] = response;
    io.to("game-room").emit("user-list", userList);
  });
  socket.on("disconnect", () => {
    delete userList[socket.handshake.issued];
    console.log("Client disconnected");
    io.to("game-room").emit("user-list", userList);
    if (Object.keys(userList).length === 0) {
      messageList.length = 0;
    }
  });

  socket.on("new-message", (message) => {
    messageList.push([userList[socket.handshake.issued], message]);
    io.to("game-room").emit("message-list", messageList);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
