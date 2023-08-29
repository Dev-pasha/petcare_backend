
const {
    getChatsFromStorage,
    getSingleChatFromStorage,
    createChatInStorage,
    deleteChatFromStorage

} = require('../../storage/chat/index')



async function getChats(req, res) {
    try {
        const chats = await getChatsFromStorage();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSingleChat(req, res) {
    try {
        const { chatId } = req.query;
        const chats = await getSingleChatFromStorage({ chatId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

async function createChat(req, res) {
    try {
        const chats = await createChatInStorage();
        res.status(200).json({
            message: "Chat created successfully",
            chats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteChat(req, res) {
    try {
        const { chatId } = req.query;
        const chats = await deleteChatFromStorage({ chatId });
        res.status(200).json({
            message: "Chat deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getChats,
    getSingleChat,
    createChat,
    deleteChat
}