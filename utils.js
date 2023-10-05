
let users = []

function addUser(userId, socketId) {
    if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId });
    }
    return users;
}

function removeUser(socketId) {
    const index = users.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
        users.splice(index, 1);
    }
}

function getUserByUserId(userId) {
    return users.find((user) => user.userId === userId);
}

module.exports = { addUser, removeUser, getUserByUserId }