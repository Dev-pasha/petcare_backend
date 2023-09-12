
const { addChatMessageInStorage , getChatFromChatIdInStorage} = require('../../storage/messages/index');

async function addChatMessage(req, res) {
    const { chatId, senderId, message } = req.body;
    console.log(req.body);
    try {
        const newMessage = await addChatMessageInStorage({
            chatId,
            senderId,
            message
        })
        // console.log(newMessage);
        res.status(200).json({
            message: "Message added successfully",
            newMessage
        });

    } catch (error) {
        console.log(error.message);
    }
}

async function getChatFromChatId(req, res) {
    const { chatId } = req.query;
    try {
        const chatMessages = await getChatFromChatIdInStorage({ chatId });
        res.status(200).json({
            message: "Chat messages fetched successfully",
            chatMessages
        })
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { addChatMessage, getChatFromChatId }