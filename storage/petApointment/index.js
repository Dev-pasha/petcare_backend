const { models } = require("../../models");

const createPetAppointmentInStorage = async ({ petId, appointmentId }) => {
  try {
    const petAppointment = await models.PetAppointment.create({
      petId: petId,
      appointmentId: appointmentId,
    });
    return petAppointment;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getPetAppointmentFromStorage = async (data) => {};

const getSinglePetAppointmentFromStorage = async (data) => {};

const deletePetAppointmentFromStorage = async (data) => {};

module.exports = {
  createPetAppointmentInStorage,
  getPetAppointmentFromStorage,
  getSinglePetAppointmentFromStorage,
  deletePetAppointmentFromStorage,
};
