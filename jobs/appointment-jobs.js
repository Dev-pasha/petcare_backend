const cron = require("node-cron");
const {
  updatePendingSlotsStatus,
  fetchAppointments,
  deleteMessagesNotifications,
  reminderService,
  reminderNotification,
  deleteMeetingNotification
} = require("./appointment-service");

const { sendEmail } = require("./node-mailer-service");

// cron for every 10 minutes
var pendingSlotToAvailableCronJob = cron.schedule("*/5 * * * *", async () => {
  await updatePendingSlotsStatus();
});

// cron for every 12 hours
var initateAppointmentReminderCron = cron.schedule("0 */12 * * *", async () => {
  let currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });
  currentDate = new Date(currentDate).toISOString().split("T")[0];
  console.log(currentDate);
  const appointments = await fetchAppointments(currentDate);

  if (appointments.length > 0) {
    appointments.map(async (appointment) => {
      const { appointmentId, appointmentStatus, client, doctor } = appointment;
      const currentTime = new Date().getTime();

      const clientUser = client;
      const doctorUser = doctor;

      sendEmail({
        email: clientUser.user.email,
        subject: "Appointment Reminder",
        text:
          "You have an Appointment in the next few hours with " +
          doctorUser.user.firstName +
          " " +
          doctorUser.user.lastName +
          " at " +
          appointment.appointmentTime,
      });

      sendEmail({
        email: doctorUser.user.email,
        subject: "Appointment Reminder",
        text:
          "You have an Appointment in the next few hours with " +
          clientUser.user.firstName +
          " " +
          clientUser.user.lastName +
          " at " +
          appointment.appointmentTime,
      });
    });
  }
});


var initiateMessageNotificationDeleteCron = cron.schedule("0 */12 * * *", async () => {
  await deleteMessagesNotifications();
});


// master cron for daily appointment reminder before appointment time
const masterCronSchedule = '0 0 * * *';
var reminder = cron.schedule(masterCronSchedule, async () => {

  const appointments = await reminderService();
  appointments.foreach((time)=>{
    const appointmentTimeList = time.appointmentTime
    const doc = time.doctor_id;
    const client = time.client_id;
    const hours = appointmentTimeList.hours()
    const minutes = appointmentTimeList.minutes()

    const cronSchedule = `${minutes - 10} ${hours} * * *`;
    const fiveMinutesBeforeAppointmentReminder = cron.schedule(cronSchedule, async () => {
      await reminderNotification(doc, client);
    })
  })

  console.log("cron job running at", new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  }));
});


// cron job runs after every 30 minutes

var deleteMeetingNotificationCron = cron.schedule("*/30 * * * *", async () => {
  await deleteMeetingNotification();
});

module.exports = {
  pendingSlotToAvailableCronJob,
  initateAppointmentReminderCron,
  initiateMessageNotificationDeleteCron,
  reminder,
  deleteMeetingNotificationCron
};
