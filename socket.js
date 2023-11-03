const socketIO = require("socket.io");
const { addUser, removeUser, getUserSocket, getUsers } = require("./utils");



function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });


  const emailToSocketIdMap = new Map();
  const socketidToEmailMap = new Map();


  io.on("connection", (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    // implementation of video call
    socket.on("room:join", (data) => {
      console.log("room:join", data);
      const { email, roomId } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      io.to(roomId).emit("user:joined", { email, id: socket.id });
      socket.join(roomId);
      io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      // console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      // console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    socket.on("call:cancel", ({ to }) => {
      io.to(to).emit("call:cancel", { message: "call is disconnected" });
    });

   
    socket.on("addUser", (userId) => {
      addUser({ userId, socketId: socket.id });
      console.log(`User with ID ${userId} joined`);
      io.emit(
        "getUsers",
        getUsers().map((user) => user.userId)
      );
    });

    socket.on("send-message", async ({ senderId, receiverId, text }) => {
      receiverId = parseInt(receiverId);
      console.log("Received message from senderId:", senderId);
      console.log("for receiverId:", receiverId);
      console.log("with text:", text);

      const receiverSocketId = getUserSocket({ userId: receiverId });
      console.log("receiverSocketId:", receiverSocketId);
      if (receiverSocketId) {
        // console.log("true");
        await io.to(receiverSocketId).emit("get-message", {
          senderId,
          text,
        });
        console.log(`Message sent to user with ID ${receiverId}`);
      } else {
        console.log("false");
        console.log(`User with ID ${receiverId} is not online`);
      }
    });

    socket.on("send-notification", ({ senderId, receiverId, text, type }) => {
      receiverId = parseInt(receiverId);
      console.log("Received notification from senderId:", senderId);
      console.log("for receiverId:", receiverId);
      console.log("with text:", text);
      // console.log("with type:", type);

      const receiverSocketId = getUserSocket({ userId: receiverId });
      console.log("receiverSocketId:", receiverSocketId);
      if (receiverSocketId) {
        // console.log("true");
        io.to(receiverSocketId).emit("get-notification", {
          senderId,
          text,
        });
        console.log(`Notification sent to user with ID ${receiverId}`);
      } else {
        console.log("false");
        console.log(`User with ID ${receiverId} is not online`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User with socket ID ${socket.id} disconnected`);

      const disconnectedUserId = getUsers().find(
        (user) => user.socketId === socket.id
      )?.userId;
      if (disconnectedUserId) {
        removeUser({ userId: disconnectedUserId });

        io.emit(
          "getUsers",
          getUsers().map((user) => user.userId)
        );
        console.log(`User with ID ${disconnectedUserId} disconnected`);
      }
    });
  });

  return io;
}

module.exports = {
  initializeSocket,
};
