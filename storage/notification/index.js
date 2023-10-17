const { models } = require("../../config/db");

const getNotificationsFromStorage = async (id) => {
  try {
    const notifications = await models.Notification.findAll({
      where: {
        userId: id,
        isRead: false,
      },
    });
    return notifications;
  } catch (error) {
    throw error;
  }
};

const getNotificationFromStorage = async (id) => {
  try {
    const notification = await models.Notification.findOne({
      where: {
        id,
      },
    });
    return notification;
  } catch (error) {
    throw error;
  }
};

const createNotificationFromStorage = async ({body}) => {
  try {
    const notification = await models.Notification.create(body);
    return notification;
  } catch (error) {
    throw error;
  }
};

const updateNotificationFromStorage = async (id, body) => {
  try {
    const notification = await models.Notification.findOne({
      where: {
        id,
      },
    });

    const updateStatus = await notification.update({
      isRead: true,
    });

    return updateStatus;
  } catch (error) {
    throw error;
  }
};


const deleteNotificationFromStorage = async (id) => {
  try {
    const notification = await models.Notification.findOne({
      where: {
        id,
      },
    });

    const deleteStatus = await notification.destroy();

    return deleteStatus;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getNotificationsFromStorage,
  getNotificationFromStorage,
  createNotificationFromStorage,
  updateNotificationFromStorage,
  deleteNotificationFromStorage,
};
