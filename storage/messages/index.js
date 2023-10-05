const { models } = require('../../models');


const addChatMessageInStorage = async ({ chatId, senderId, message
}) => {
    try {
        const newMessage = await models.ChatMessage.create({
            chatId: chatId,
            sender: senderId,
            message: message
        })
        return newMessage;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}

const getChatFromChatIdInStorage = async ({ chatId }) => {
    try {
        const chatMessages = await models.ChatMessage.findAll({
            where: {
                chatId: chatId
            }
        
        })
        return {chatMessages};
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}

module.exports = { addChatMessageInStorage, getChatFromChatIdInStorage }

