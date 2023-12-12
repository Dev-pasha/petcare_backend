const { models } = require("../../config/db");

const getNotificationsFromStorage = async ({ id, actionType }) => {
  try {

    if(!actionType){
      const notifications = await models.Notification.findAll({
        where: {
          userId: id,
          isRead: false,
        },
        include: [
          {
            model: models.users,
            attributes: ["firstName", "lastName"],
          }
        ]
      });
      return notifications;
    }

    const notifications = await models.Notification.findAll({
      where: {
        userId: id,
        isRead: false,
        actionType: actionType
      },
      include: [
        {
          model: models.users,
          attributes: ["firstName", "lastName"],
        }
      ]
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

const createNotificationFromStorage = async ({ body }) => {
  try {
    const notification = await models.Notification.create(body);
    return notification;
  } catch (error) {
    throw error;
  }
};

const updateNotificationFromStorage = async ({ id }) => {
  try {
    const notification = await models.Notification.findOne({
      where: {
        id: id,
      },
    });

    const updateStatus = await notification.update({
      isRead: true,
    });
    console.log("updateStatus", updateStatus)

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


const updateStatusNotificationFromStorage = async ({ id }) => {
  try {

    console.log("id", id)
    const notification = await models.Notification.findOne({
      where: {
        id: id,
      },
    });

    // console.log("notification", notification)
    const updateStatus = await notification.update({
      isRead: false,
    });
    // console.log("updateStatus", updateStatus)

    return updateStatus;
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
  updateStatusNotificationFromStorage
};
