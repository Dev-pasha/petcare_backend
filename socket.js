const { addUser, removeUser, getUserByUserId } = require('./utils')
const server = require("./index");


const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`User with socket id: ${socket.id} is connected to socket server`);

    // take userId and socketId from user

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUserByUserId(receiverId)
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text
        })
    })

    socket.on('getMessages', ({ senderId, receiverId }) => {
        
    })

    // send and get message


    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });





})

