let users = []; // Use an array for user management


const addUser = ({userId, socketId}) => {
    console.log('add user maen user id:', userId)
    console.log('add user maen socket id:', socketId)
    users.push({ userId, socketId });
}

const removeUser = ({userId}) => {
    console.log('remove user maen user id:', userId)
    users = users.filter((user) => user.userId !== userId);
}

const getUserSocket = ({userId}) => {
    console.log('get user maen user id:', userId)
    const user = users.find((u) => u?.userId === userId);
    console.log("user:", user);
    console.log("users:", users);
    return user ? user.socketId : null;
}
 
module.exports = {
    addUser, removeUser, getUserSocket, getUsers: () => users,
};