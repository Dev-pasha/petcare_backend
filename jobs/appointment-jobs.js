const cron = require("node-cron");
const {
  updatePendingSlotsStatus,
  fetchAppointments,
} = require("./appointment-service");

const { sendEmail } = require("./node-mailer-service");

// cron for every 10 minutes
var pendingSlotToAvailableCronJob = cron.schedule("*/10 * * * *", async () => {
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


module.exports = {
  pendingSlotToAvailableCronJob,
  initateAppointmentReminderCron,
};
