
const {
    addPetInStorage,
    updatePetInStorage,
    deletePetInStorage,
    getPetsFromStorage,
    getSinglePetFromStorage,
}= require('../../storage/pet/index')
async function addPet(req, res) {
  try {
    const pet = req.body.pet;
    const id = req.body.id;
    const newPet = await addPetInStorage({ pet, id });
    res.status(201).json({
      message: "Pet added successfully",
      pet: newPet,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updatePet(req, res) {
    try {
        const pet = req.body.pet;
        const id = req.body.id;
        const updatedPet = await updatePetInStorage({ pet, id });
        res.status(200).json({
        message: "Pet updated successfully",
        pet: updatedPet,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deletePet(req, res) {
    try {
        const id = req.body.id;
        const deletedPet = await deletePetInStorage({ id });
        res.status(200).json({
        message: "Pet deleted successfully",
        pet: deletedPet,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getPets(req, res) {
    try {
        const id = req.body.id;
        const pets = await getPetsFromStorage({ id });
        res.status(200).json({
        message: "Pets fetched successfully",
        pets: pets,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSinglePet(req, res) {
    try {
        const id = req.body.id;
        const pet = await getSinglePetFromStorage({ id });
        res.status(200).json({
        message: "Pet fetched successfully",
        pet: pet,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { addPet, updatePet, deletePet, getPets, getSinglePet };
