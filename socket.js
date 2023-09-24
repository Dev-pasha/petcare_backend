const { addUser, removeUser, getUserByUserId } = require('./utils')
const { addChatMessage , getChatFromChatId } = require('./routes/chatMessage/handlers')
const {getChatFromChatIdInStorage} = require('./storage/messages/index')
const socketIO = require('socket.io');

function initializeSocket(server) {
    let messages = []
    const io = socketIO(server, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        console.log(`user connected with id: ${socket.id}`)

        socket.on('join', ({ userId }) => {
            addUser(userId, socket.id);
            console.log(`user with id: ${userId} joined`);
        });

        socket.removeUser = () => {
            removeUser(socket.id);
            console.log(`user with id: ${socket.id} left`);
        };

        socket.on('send-message', async ( {chatId , senderId, receiverId, text} ) => {
            console.log(senderId, chatId, text)
            const message = { chatId, senderId, text , receiverId };
           const chat = await getChatFromChatIdInStorage({chatId})
            messages.push(message);

            // write the code to send the array of messages to the client side


            console.log(chat.map((message) => message.message));
            socket.emit('receive-message-list', chat);

            // addChatMessage({ senderId, chatId, text });
            // const user = getUserByUserId(receiverId);
            // if (user) {
            //     io.to(user.socketId).emit('receive-message', {
            //         senderId,
            //         text,
            //     });
            // }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
}

module.exports = {
    initializeSocket,
};