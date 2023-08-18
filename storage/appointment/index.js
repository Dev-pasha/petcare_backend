const { models } = require("../../models");

const createAppointmentInStorage = async (data) => {
  try {
    const appointment = await models.Appointment.create(data);
    return appointment;
  } catch (error) {
    console.log(error.message);
  }
};

const getAppointmentsInStorage = async () => {
  try {
    const appointmentCount = await models.Appointment.count();
    const appointments = await models.Appointment.findAll();
    return { appointmentCount, appointments };
  } catch (error) {
    console.log(error.message);
  }
};

const getAppointmentByIdInStorage = async (appointmentId) => {
  try {
    const appointment = await models.Appointment.findOne({
      where: {
        appointmentId: appointmentId,
      },
    });
    return appointment;
  } catch (error) {
    console.log(error.message);
  }
};

const updateAppointmentInStorage = async (data) => {
  try {
    const { appointmentId } = data;
    const exsistingAppointment = await models.Appointment.findOne({
      where: {
        appointmentId: appointmentId,
      },
    });
    const updatedAppointment = await exsistingAppointment.update(data);
    return updatedAppointment;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteAppointmentInStorage = async (appointmentId) => {
  try {
    const appointment = await models.Appointment.findOne({
      where: {
        appointmentId: appointmentId,
      },
    });
    await appointment.destroy();
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createAppointmentInStorage,
  getAppointmentsInStorage,
  getAppointmentByIdInStorage,
  updateAppointmentInStorage,
  deleteAppointmentInStorage,
};
