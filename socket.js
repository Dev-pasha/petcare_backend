const socketIO = require("socket.io");
const { addUser, removeUser, getUserSocket, getUsers } = require("./utils");

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    // to get socket id as a caller id
    // get the user id and socket id from the function getUserSocket
    // let callerSocketId;
    socket.on('camuser', (userId) => {
      if (!userId) return console.log('no user id')
      console.log('camuser', userId)
      addUser({ userId, socketId: socket.id });
      // console.log(`User with ID ${userId} joined the video call`);
      // function to get the user socket id from the user id and emit the socket id
      // const user = getUsers().find((user) => user.userId === userId);
      // console.log('user', user)
      // callerSocketId = getUserSocket({ userId: user.userId });
      // console.log('callerSocketId', callerSocketId)
      // callerSocketId = callerSocketId ? callerSocketId : null;
    })

    socket.on('getmyId', (userId) => {
      const user = getUsers().find((user) => user.userId === userId);
      const mySocketId = getUserSocket({ userId: user.userId });
      console.log('mySocketId', mySocketId)
      socket.emit('myId', mySocketId)

    })

    // sockt for call
    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
      // console.log({ userToCall, signalData, from, name })
      console.log('offer in backend', signalData )
      // io to the user about the incoming call
      io.to(userToCall).emit("calluser", {
        signal: signalData,
        from,
        name,
      });
    });

    // socket for answer
    socket.on("answercall", (data) => {
      console.log('here answer call hit')
      console.log("answercall", data);
      io.to(data.to).emit("callaccepted", data.signal);
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
