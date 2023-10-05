const socketIO = require("socket.io");

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  let users = []; // Use an array for user management

  function addUser(userId, socketId) {
    users.push({ userId, socketId });
  }

  function removeUser(userId) {
    users = users.filter((user) => user.userId !== userId);
  }

  function getUserSocket(userId) {
    const user = users.find((user) => user.userId === userId);
    console.log("user:", user);
    console.log("users:", users);
    return user ? user.socketId : null;
  }

  io.on("connection", (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log(`User with ID ${userId} joined`);
      io.emit("getUsers", users.map((user) => user.userId)); // Send an array of connected user IDs
    });

    socket.on("send-message", async ({ senderId, receiverId, text }) => {
      receiverId = parseInt(receiverId);
      // console.log("Received message from senderId:", senderId);
      // console.log("for receiverId:", receiverId);
      // console.log("with text:", text);

      const receiverSocketId = getUserSocket(receiverId);
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

    socket.on("disconnect", () => {
      console.log(`User with socket ID ${socket.id} disconnected`);

      const disconnectedUserId = users.find((user) => user.socketId === socket.id)?.userId;
      if (disconnectedUserId) {
        removeUser(disconnectedUserId);

        io.emit("getUsers", users.map((user) => user.userId));
        console.log(`User with ID ${disconnectedUserId} disconnected`);
      }
    });
  });

  return io;
}

module.exports = {
  initializeSocket,
};
