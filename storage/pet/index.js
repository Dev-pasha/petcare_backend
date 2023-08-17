const { models } = require("../../models");

const addPetInStorage = async ({ pet }) => {
  try {
    const newPet = await models.Pet.create(pet);
    return newPet;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

const updatePetInStorage = async (pet) => {
  const { petId } = pet;
  try {
    const exsistingPet = await models.Pet.findOne({
      where: {
        petId: petId,
      },
    });

    const updatedPet = await exsistingPet.update(pet);
    return updatedPet;
  } catch (error) {
    throw error.message;
  }
};

const deletePetInStorage = async ({ petId }) => {
  try {
    const pet = await models.Pet.findOne({
      where: {
        petId: petId,
      },
    });
    await pet.destroy();
    return true;
  } catch (error) {
    throw error.message;
  }
};

const getPetsFromStorage = async (clientId) => {
  try {
    const pets = await models.Pet.findAll({
      where: {
        clientId: clientId,
      },
    });
    return pets;
  } catch (error) {
    throw error.message;
  }
};

const getSinglePetFromStorage = async ({ id }) => {
  try {
    const pet = await models.Pet.findOne({
      where: {
        petId: id,
      },
    });
    return pet;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  addPetInStorage,
  updatePetInStorage,
  deletePetInStorage,
  getPetsFromStorage,
  getSinglePetFromStorage,
};
