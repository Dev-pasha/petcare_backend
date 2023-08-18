const { models } = require("../../models");
const {
  createAppointmentInStorage,
  getAppointmentsInStorage,
  getAppointmentByIdInStorage,
  updateAppointmentInStorage,
  deleteAppointmentInStorage,
} = require("../../storage/appointment/index");

async function createAppointment(req, res) {
  try {
    const data = req.body;
    const appointment = await createAppointmentInStorage(data);
    res.status(200).json({
      message: "appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAppointments(req, res) {
  try {
    const appointments = await getAppointmentsInStorage();
    res.status(200).json({
      message: "appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleAppointments(req, res) {
  try {
    const { appointmentId } = req.query;
    const appointment = await getAppointmentByIdInStorage(appointmentId);
    res.status(200).json({
      message: "appointment fetched successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateAppointment(req, res) {
  try {
    const data = req.body;
    const appointment = await updateAppointmentInStorage(data);
    res.status(200).json({
      message: "appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { appointmentId } = req.query;
    const appointment = await deleteAppointmentInStorage(appointmentId);
    res.status(200).json({
      message: "appointment deleted successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createAppointment,
  getAppointments,
  getSingleAppointments,
  updateAppointment,
  deleteAppointment,
};
