const { models } = require("../../models");


const getChatsFromStorage = async () => { }

const getSingleChatFromStorage = async ({ chatId }) => { }

const createChatInStorage = async () => {
    
 }

const deleteChatFromStorage = async ({ chatId }) => {
    try {
        const chat = await models.Chat.destroy({
            where: {
                chatId: chatId
            }
        })
        return true
    } catch (error) {
        throw error
    }
}



module.exports = {
    getChatsFromStorage,
    getSingleChatFromStorage,
    createChatInStorage,
    deleteChatFromStorage
}