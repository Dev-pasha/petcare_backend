
const { addChatMessageInStorage , getChatFromChatIdInStorage} = require('../../storage/messages/index');

async function addChatMessage(req, res) {
    const { chatId, senderId, message } = req.body;
    try {
        const newMessage = await addChatMessageInStorage({
            chatId,
            senderId,
            message
        })
        // console.log(newMessage);
        res.status(200).send(newMessage);

    } catch (error) {
        console.log(error.message);
    }
}

async function getChatFromChatId(req, res) {
    const { chatId } = req.query;
    try {
        const chatMessages = await getChatFromChatIdInStorage({ chatId });
        res.status(200).send(chatMessages);
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { addChatMessage, getChatFromChatId }