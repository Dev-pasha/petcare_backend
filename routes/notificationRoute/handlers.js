
const {
    getNotificationsFromStorage,
    getNotificationFromStorage,
    createNotificationFromStorage,
    updateNotificationFromStorage,
    deleteNotificationFromStorage,
    updateStatusNotificationFromStorage

} = require('../../storage/notification/index');



async function getNotifications(req, res) {
    const { id } = req.query;
    console.log('id', id)
    try {
        const notifications = await getNotificationsFromStorage({id});
        res.status(200).send(notifications);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

async function getNotification(req, res) {
    const { id } = req.query;
    try {
        const notification = await getNotificationFromStorage(id);
        res.status(200).send(notification);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

async function createNotification(req, res) {
    const { body } = req.query;
    try {
        const notification = await createNotificationFromStorage({ body: body });
        res.status(200).send(notification);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

async function updateNotification(req, res) {
    // const { body } = req;
    const { id } = req.query;
    console.log('id of update ', id)
    try {
        const notification = await updateNotificationFromStorage({id});
        res.status(200).send(notification);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

async function deleteNotification(req, res) {
    const { id } = req.query;
    try {
        const notification = await deleteNotificationFromStorage(id);
        res.status(200).send(notification);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

async function statusChangeNotification(req, res) {
    const { id } = req.query;
    try {
        const notification = await updateStatusNotificationFromStorage({id});
        res.status(200).send(notification);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

module.exports = {
    getNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification,
    statusChangeNotification
}