const {
  addPetInStorage,
  updatePetInStorage,
  deletePetInStorage,
  getPetsFromStorage,
  getSinglePetFromStorage,
} = require("../../storage/pet/index");

async function addPet(req, res) {
  try {
    const pet = req.body;
    const newPet = await addPetInStorage(pet);
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
    const pet = req.body
    const updatedPet = await updatePetInStorage(pet);
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
    const {petId} = req.query;
    const deletedPet = await deletePetInStorage({ petId });
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
    const { clientId } = req.query;
    const pets = await getPetsFromStorage(clientId);
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
    const id = req.query;
    const pet = await getSinglePetFromStorage(id);
    res.status(200).json({
      message: "Pet fetched successfully",
      pet: pet,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addPet, updatePet, deletePet, getPets, getSinglePet };
