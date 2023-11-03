const { models } = require("../config/db");

async function updatePendingSlotsStatus() {
  try {
    const pendingSlots = await models.slot.findAll({
      where: {
        slotStatus: "Pending",
      },
    });

    if (pendingSlots.length === 0) return "no pending slots found";

    const pendingMap = pendingSlots.map((slot) => {
      return slot.slotId;
    });

    if (pendingMap) {
      pendingMap.map((id) => {
        models.slot.update(
          { slotStatus: "available" },
          { where: { slotId: id } }
        );
      });

      return "cron job run successfully";
    }
  } catch (error) {
    return error;
  }
}

async function initiateExpiredAppointments() {}

async function fetchAppointments(slotDate) {
  try {
    date = slotDate + "T00:00:00.000Z";
    const appointments = await models.Appointment.findAll({
      where: {
        appointmentStatus: "pending",
        appointmentDate: date,
      },
    });

    let appointment = appointments.map(async (appointment) => {
      return {
        appointmentId: appointment.appointmentId,
        appointmentDate: appointment.appointmentDate,
        appointmentStatus: appointment.appointmentStatus,
        appointmentTime: appointment.appointmentTime,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
        client: await models.client.findOne({
          where: {
            clientId: appointment.clientId,
          },
          include: [
            {
              model: models.users,
              attributes: ["firstName", "lastName", "email"],
            },
          ],
        }),
        doctor: await models.doctor.findOne({
          where: {
            doctorId: appointment.doctorId,
          },
          include: [
            {
              model: models.users,
              attributes: ["firstName", "lastName", "email"],
            },
          ],
        }),
      };
    });

    return Promise.all(appointment);
  } catch (error) {
    return error.message;
  }
}

async function deleteMessagesNotifications() {
  try {
    const notifications = await models.Notification.findAll({
      where: {
        actionType: "message",
        isRead: true,
      },
    });

    if (notifications.length === 0) return "no notifications found";

    const notificationMap = notifications.map((notification) => {
      return notification.id;
    });

    notificationMap.map((id) => {
      models.Notification.destroy({ where: { id: id } });
    });

    return "cron job run successfully";
  } catch (error) {
    return error;
  }
}

module.exports = {
  updatePendingSlotsStatus,
  fetchAppointments,
  deleteMessagesNotifications,
};
