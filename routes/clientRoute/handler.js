const { models } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "hakoonamatata";
const saltRounds = 10;

async function getAllPets(req, res) {
  const { id } = req.query;
  try {
    const pets = await models.Pet.findAll({
      where: {
        clientId: id,
      },
    });
    res.status(200).send(pets);

  } catch (error) {
    console.log(error.message);
  }
}

async function getPet(req, res) {
  const { petId } = req.query;
  try {
    const pet = await models.Pet.findOne({
      where: {
        petId: petId,
      },
    });
    res.status(200).send(pet);
  } catch (error) {
    console.log(error.message);
  }
}

async function createPet(req, res) {
  // console.log(req.body);

  let { pet } = req.body;

  let { petHeight, petWeight, petAge } = pet;
  parsepetHeight = parseInt(petHeight);
  parsepetWeight = parseInt(petWeight);
  parsepetAge = parseInt(petAge);

  pet["petHeight"] = parsepetHeight;
  pet["petWeight"] = parsepetWeight;
  pet["petAge"] = parsepetAge;
  console.log(pet);
  try {
    const newPet = await models.Pet.create(pet);
    res.status(200).send(newPet);
  } catch (error) {
    console.log(error.message);
  }
}

async function updatePet(req, res) {
  const { pet } = req.body;
  const { petId } = pet;
  try {
    const exsistingPet = await models.Pet.findOne({
      where: {
        petId: petId,
      },
    });

    const updatedPet = await exsistingPet.update(pet);
    res.status(200).send(updatedPet);
  } catch (error) {
    console.log(error.message);
  }
}

async function deletePet(req, res) {
  const { petId } = req.query;
  console.log(petId);
  try {
    const pet = await models.Pet.findOne({
      where: {
        petId: petId,
      },
    });
    await pet.destroy();
    res.send(200, "Pet deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
}

async function getMyAppoinments(req, res) {
  const { id } = req.query;
  try {
    const appoinments = await models.Appoinment.findAll({
      where: {
        clientId: id,
      },
    });
    res.status(200).json({
      appoinments,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAppoinment(req, res) {
  const { id } = req.query;
  try {
    const appoinment = await models.Appoinment.findOne({
      where: {
        appoinmentId: id,
      },
    });
    res.status(200).json({
      appoinment,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createAppoinment(req, res) {
  const data = req.body;
  try {
    const newAppoinment = await models.Appoinment.create(data);
    res.status(200).json({
      message: "Appoinment added successfully",
      appoinment: newAppoinment,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createReview(req, res) {
  const data = req.body;
  try {
    const newReview = await models.Review.create(data);
    res.status(200).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createClient(req, res) {
  const data = req.body;
  console.log(data);
  let userData = data;
  let existingUser;
  let user;
  try {
    existingUser = await models.users.findOne({
      where: {
        email: userData.email,
      },
    });
    if (existingUser) {
      console.log("user already exists");

      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser.id,
        },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      client = await models.client.create({
        ...userData.client,
      });
      await existingUser.setClient(client);

      res.status(200).json({
        existingUser: existingUser,
        client: client,
        // token: token,
      });
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;

      user = await models.users.create({
        ...userData,
      });
      client = await models.client.create({
        ...userData.client,
      });
      await user.setClient(client);

      res.status(200).json({
        user: user,
        client: client,
      });
    }
  } catch (error) {
    throw error.message;
  }
}

async function updateClient(req, res) {
  const { id } = req.body;
  const data = req.body;
  try {
    const exsistingClient = await models.Client.findOne({
      where: {
        clientId: id,
      },
    });
    const updatedClient = await exsistingClient.update(data);
    res.status(200).json({
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getClient(req, res) {
  const { id } = req.query;
  try {
    const client = await models.client.findOne({
      where: {
        clientId: id,
      },
      
      include:[
        {
          model: models.users,
          attributes: ['firstName', 'lastName', 'phoneNumber', 'address', 'userName']
        }
      ]
    });
    res.status(200).json({
      client,
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  getMyAppoinments,
  getAppoinment,
  createAppoinment,
  createReview,
  createClient,
  updateClient,
  getClient,
};
