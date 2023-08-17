const {
  createPetAppointmentInStorage,
  getPetAppointmentFromStorage,
  getSinglePetAppointmentFromStorage,
  deletePetAppointmentFromStorage,
} = require("../../storage/petApointment/index");



async function createPetAppointment(req, res) {
  const { petId, appointmentId } = req.body;
  try {
    const petAppointment = await createPetAppointmentInStorage({
      petId,
      appointmentId,
    });
    res.status(200).json({
      message: "Pet Appointment created successfully",
      data: petAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Pet Appointment not created",
      error: error.message,
    });
  }
}

async function getPetAppointment(req, res) {}

async function singlePetAppointment(req, res) {}

async function deletePetAppointment(req, res) {}

module.exports = {
  createPetAppointment,
  getPetAppointment,
  singlePetAppointment,
  deletePetAppointment,
};
