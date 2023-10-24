const { models } = require("../../models");
const { Op } = require("sequelize");


const getChatsOfUserFromStorage = async ({ userId }) => {
    try {
        let user;
        const chats = await models.Chats.findAll({
            where: {
                [Op.or]: [
                    {
                        userA: userId,
                    },
                    {
                        userB: userId,

                    }
                ]
            },
            include: [
                {
                    model: models.ChatMessage,
                    attributes: ['message', 'createdAt', 'sender'],
                    order: [['createdAt', 'DESC']],
                    limit: 1
                },
            ]
        })

        return { chats}

    } catch (error) {
        console.log(error.message)
    }
}

// const getSingleChatFromStorage = async ({ chatId }) => { }

const createChatInStorage = async ({ senderId,
    receiverId }) => {
    try {

        const exsistingChat = await models.Chats.findOne({
            where: {
                [Op.or]: [
                    {
                        userA: senderId,
                        userB: receiverId
                    },
                    {
                        userA: receiverId,
                        userB: senderId
                    }
                ]
            }
        })

        if (exsistingChat) {
            return exsistingChat
        }
        
        const chat = await models.Chats.create({
            userA: senderId,
            userB: receiverId
        })

        return chat

    } catch (error) {
        console.log(error.message)
    }

}

// const deleteChatFromStorage = async ({ chatId }) => {
//     try {
//         const chat = await models.Chat.destroy({
//             where: {
//                 chatId: chatId
//             }
//         })
//         return true
//     } catch (error) {
//         throw error
//     }
// }



module.exports = {
    getChatsOfUserFromStorage,
    // getSingleChatFromStorage,
    createChatInStorage,
    // deleteChatFromStorage
}