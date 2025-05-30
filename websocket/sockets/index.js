import { Server, Socket } from "socket.io";

const socketHandler = (socket, io) => {
  socket.on("room-name", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on("sendMessage", ({ room, message,username,dp }) => {
    console.log(`📨 Message from ${socket.id} to room ${room}: ${message}`);
    socket.broadcast.to(room).emit("receiveMessage", message,username,dp);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
};

export default socketHandler;
