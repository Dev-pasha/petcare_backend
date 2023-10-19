const { models } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createChatInStorage } = require("../../storage/chat");
const { addChatMessageInStorage } = require("../../storage/messages");
const { createNotificationFromStorage } = require("../../storage/notification");
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
  console.log(id);
  try {
    const appoinments = await models.Appointment.findAll({
      where: {
        client_id: id,
      },
    });
    res.status(200).send(appoinments);
  } catch (error) {
    console.log(error.message);
  }
}

async function getAppoinment(req, res) {
  const { id } = req.query;
  console.log(id);
  try {
    const appoinment = await models.Appointment.findOne({
      where: {
        appointmentId: id,
      },
    });

    const pet = await models.Pet.findOne({
      where: {
        petId: appoinment.petId,
      },
    });

    const doctor = await models.doctor.findOne({
      where: {
        doctorId: appoinment.doctorId,
      },
    });

    const doctorUser = await models.users.findOne({
      where: {
        userId: doctor.user_id,
      },
    });

    res.status(200).send({
      appoinment,
      doctorUser,
      pet,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createAppoinment(req, res) {
  const { data } = req.body;
  const { doctorId } = data;
  const { clientId } = data;
  const { slotId } = data;
  const _slotId = parseInt(slotId);
  const id = parseInt(doctorId);
  const _clientId = parseInt(clientId);
  data["doctorId"] = id;
  data["slotId"] = _slotId;

  // console.log(data);

  try {
    const newAppoinment = await models.Appointment.create({
      ...data,
      appointmentStatus: "pending",
      paymentStatus: "success",
    });

    const slot = await models.slot.findOne({
      where: {
        slotId: _slotId,
      },
    });

    await slot.update({
      slotStatus: "Unavailable",
    });

    const doctor = await models.doctor.findOne({
      where: {
        doctorId: id,
      },
      include: [
        {
          model: models.users,
          attributes: ["userId", "firstName", "lastName"],
        },
      ],
    });

    console.log("doctor", doctor.user.userId);

    const client = await models.client.findOne({
      where: {
        clientId: _clientId,
      },
      include: [
        {
          model: models.users,
          attributes: ["userId", "firstName", "lastName"],
        },
      ],
    });

    console.log("client", client.user.userId);
    let clientName = `${client.user.firstName} ${client.user.lastName}`;
    let docName = `${doctor.user.firstName} ${doctor.user.lastName}`;
    console.log("clientName", clientName);
    console.log("docName", docName);

    const chatCreated = await createChatInStorage({
      senderId: client.user.userId,
      receiverId: doctor.user.userId,
    });

    const chatId = chatCreated.chatId;

    const intiateTextToDoc = await addChatMessageInStorage({
      chatId,
      senderId: client.user.userId,
      message: `Hi, I am ${clientName}. I have booked an appointment with you on ${new Date(newAppoinment.appointmentDate)} at ${newAppoinment.appointmentTime}.`,
    });

    console.log("intiateTextToDoc success");

    const intiateTextToClient = await addChatMessageInStorage({
      chatId,
      senderId: doctor.user.userId,
      message: `Thanks for booking an appointment with us. I am ${docName}. I will be available on ${new Date(newAppoinment.appointmentDate)} at ${newAppoinment.appointmentTime}. `,
    });

    console.log("intiateTextToClient success");

    // notifications to doctor and admin
    const notificationBodyForDoc = {
      actionType: "appointment",
      message: `New appointment booked by ${clientName} on ${new Date(newAppoinment.appointmentDate)} at ${newAppoinment.appointmentTime}.`,
      userId: doctor.user.userId,
      isRead: false,
    }
    const notificationToDoctor = await createNotificationFromStorage({ body: notificationBodyForDoc });
    console.log("notificationToDoctor success");

    const notificationBodyForAdmin = {
      actionType: "appointment",
      message: `New appointment booked by ${clientName} on ${new Date(newAppoinment.appointmentDate)} at ${newAppoinment.appointmentTime}. with ${docName}`,
      userId: 1,
      isRead: false,
    }
    const notificationToAdmin = await createNotificationFromStorage({ body: notificationBodyForAdmin });
    console.log("notificationToAdmin success");

    res.status(200).send(newAppoinment);
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
  const { data } = req.body;
  // console.log(data);
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

      // notification for admin 
      const notificationBodyForAdmin = {
        actionType: "client_signup",
        message: `New client signed up with email ${existingUser.email}`,
        userId: 1,
        isRead: false,
      }
      const notificationToAdmin = await createNotificationFromStorage({ body: notificationBodyForAdmin });
      console.log("client signup notification sent to admin successfully");

      res.json({
        message: "User already exists and client created successfully",
        status: 200,
        // existingUser: existingUser,
        // client: client,
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

      const notificationBodyForAdmin = {
        actionType: "client_signup",
        message: `New client signed up with email ${user.email}`,
        userId: 1,
        isRead: false,
      }
      const notificationToAdmin = await createNotificationFromStorage({ body: notificationBodyForAdmin });
      console.log("client signup notification sent to admin successfully");

      res.json({
        status: 200,
        message: "User with client profile created successfully",
        // user: user,
        // client: client,
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

      include: [
        {
          model: models.users,
          attributes: [
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
            "userName",
          ],
        },
      ],
    });
    res.status(200).json({
      client,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function slotStatusPending(req, res) {
  console.log("slot pending", req.query);
  const { slotId } = req.query;
  console.log("slot pending", slotId);

  if (!slotId) {
    return res.status(400).send({
      message: "Slot id is required",
    });
  }

  try {
    const exsistngSlot = await models.slot.findOne({
      where: {
        slot_id: slotId,
      },
    });

    const slot = await exsistngSlot.update({
      slotStatus: "Pending",
    });

    console.log(slot);

    res.status(200).send(slot);
  } catch (error) {
    console.log(error.message);
  }
}

async function slotStatusUnavailable(req, res) {
  console.log("slot unavailable", req.query);
  const { slotId } = req.query;
  console.log("slot unavailable", slotId);

  if (!slotId) {
    return res.status(400).send({
      message: "Slot id is required",
    });
  }

  try {
    const exsistingSlot = await models.slot.findOne({
      where: {
        slot_id: slotId,
      },
    });

    const slot = await exsistingSlot.update({
      slotStatus: "Unavailable",
    });

    res.status(200).send(slot);
  } catch (error) {
    console.log(error.message);
  }
}

async function slotStatusAvailable(req, res) {
  console.log("slot available", req.query);
  const { slotId } = req.query;
  console.log("slot available", slotId);

  if (!slotId) {
    return res.status(400).send({
      message: "Slot id is required",
    });
  }

  try {
    const exsistingSlot = await models.slot.findOne({
      where: {
        slot_id: slotId,
      },
    });

    const slot = await exsistingSlot.update({
      slotStatus: "Available",
    });

    res.status(200).send(slot);
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
  // slots working
  slotStatusPending,
  slotStatusUnavailable,
  slotStatusAvailable,
};
