import { Server } from "socket.io";
import { createServer } from "http";
import socketHandler from "./sockets/index.js";

const PORT = process.env.PORT || 3005;

const httpServer = createServer()

const io = new Server(httpServer,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socketHandler(socket, io);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
