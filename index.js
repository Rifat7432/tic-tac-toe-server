
const express = require("express");
const cors = require("cors");
require("dotenv").config;
const port = process.env.PORT || 5000 ;

const app = express();
const http = require("http");

const socketIo  = require("socket.io");
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server)

app.get("/", (req, res) => {
  res.send("tai tac toe server is working");
});




io.on("connection", (socket) => {
  socket.on('room',(data)=>{
socket.join(data.roomId)
  })
  socket.on("send-massage", (data) => {
    socket.to(data.room).emit("receive-massage", data);
  });
  socket.on("get-turn", (data) => {
    socket.to(data.room).emit("send-turn", data);
  });
  socket.on("winner", (data) => {
    socket.to(data.room).emit("send-winner", data);
  });
});

server.listen(port, () => console.log(`server is running on ${port}`));
