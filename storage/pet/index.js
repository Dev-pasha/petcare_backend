const { models } = require("../../models");

const addPetInStorage = async ({ pet, id }) => {
  try {
    const petCheck = await models.Pet.findOne({
      where: {
        petName: pet.petName,
        id: id,
      },
    });
    if (petCheck) {
      throw new Error("Pet already exists");
    }
    const newPet = await models.Pet.create({
      petName: pet.petName,
      petType: pet.petType,
      petBreed: pet.petBreed,
      petAge: pet.petAge,
      petWeight: pet.petWeight,
      petHeight: pet.petHeight,
      petColor: pet.petColor,
      petDescription: pet.petDescription,
      petImage: pet.petImage,
      id: id,
    });
    return newPet;
  } catch (error) {
    throw error.message;
  }
};
const updatePetInStorage = async ({ pet, id }) => {
  try {
    const exsistingPet = await models.Pet.findOne({
      where: {
        id: pet.id,
        id: id,
      },
    });

    const updatedPet = await exsistingPet.update(pet);
    return updatedPet;
  } catch (error) {
    throw error.message;
  }
};
const deletePetInStorage = async ({ id }) => {
  try {
    const pet = await models.Pet.findOne({
      where: {
        id: id,
      },
    });
    await pet.destroy();
    return true;
  } catch (error) {
    throw error.message;
  }
};
const getPetsFromStorage = async ({ id }) => {
  try {
    const pets = await models.Pet.findAll({
      where: {
        id: id,
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
        id: id,
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
