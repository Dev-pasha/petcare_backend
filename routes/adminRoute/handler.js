const { models } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "hakoonamatata"; // Replace with your actual secret key
const saltRounds = 10; // Number of salt rounds for bcrypt

async function getAllDoctors(req, res) {
  try {
    const doctors = await models.doctor.findAll({
      include: [
        {
          model: models.users,
        },
      ],
    });
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleDoctor(req, res) {
  const { id } = req.query;
  try {
    console.log(id);
    const doctor = await models.doctor.findOne({
      where: {
        doctorId: id,
      },
      include: [
        {
          model: models.users,
        },
      ],
    });
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllclients(req, res) {
  try {
    const clients = await models.client.findAll({
      include: [
        {
          model: models.users,
        },
      ],
    });
    res.status(200).send(clients);
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleClient(req, res) {
  const { id } = req.query;
  try {
    const client = await models.client.findOne({
      where: {
        clientId: id,
      },
      include: [
        {
          model: models.users,
        },
      ],
    });

    res.status(200).send({ client });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllAppointmentsOfAdmin(req, res) {
  try {
    const appointments = await models.Appointment.findAll();
    res.status(200).send(appointments)
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllAppointments(req, res) {
  const { id } = req.query;
  let _id = parseInt(id);
  console.log("id", id);
  try {
    const appoint = await models.Appointment.findAll({
      where: {
        doctorId: _id,
      },
    });


    console.log("appoint", appoint)
    res.status(200).send(
      appoint,
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleAppointment(req, res) {
  const { id } = req.query;
  console.log("id recived", id);
  try {
    const appoint = await models.Appointment.findOne({
      where: {
        appointmentId: id,
      },
    });

    const clientId = appoint.clientId;
    const doctorId = appoint.doctorId;
    const petId = appoint.petId;
    const slotId = appoint.slotId;

    console.log("clientId", clientId);
    console.log("doctorId", doctorId);
    console.log("petId", petId);
    console.log("slotId", slotId);

    const client = await models.client.findOne({
      where: {
        clientId: clientId,
      },
      include: [
        {
          model: models.users,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const doctor = await models.doctor.findOne({
      where: {
        doctorId: doctorId,
      },
      include: [
        {
          model: models.users,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const pet = await models.Pet.findOne({
      where: {
        pet_id: petId,
      },
    });

    const slot = await models.slot.findOne({
      where: {
        slotId: slotId,
      },
    });

    res.status(200).send({
      appoint,
      client,
      doctor,
      pet,
      slot,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllAppointmentsOfDoctorById(req, res) {
  try {
    const appointments = await models.Appointment.findAll({
      where: {
        doctorId: req.params.id,
      },
    });
    res.status(200).json({
      response: appointments,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllAppointmentsOfClientById(req, res) {
  const { id } = req.query
  console.log('appointmentClient', id)
  try {
    const appointments = await models.Appointment.findAll({
      where: {
        clientId: id,
      },
    });
    res.status(200).send(appointments)
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleAppointmentById(req, res) {
  // const { id } = req.query;
  // console.log("id recived", id);
  // try {
  //   const appoint = await models.Appointment.findOne({
  //     where: {
  //       appointmentId: id,
  //     },
  //   });

  //   const clientId = appoint.clientId;
  //   const doctorId = appoint.doctorId;
  //   const petId = appoint.petId;
  //   const slotId = appoint.slotId;

  //   console.log("clientId", clientId);
  //   console.log("doctorId", doctorId);
  //   console.log("petId", petId);
  //   console.log("slotId", slotId);

  //   const client = await models.client.findOne({
  //     where: {
  //       clientId: clientId,
  //     },
  //     include: [
  //       {
  //         model: models.users,
  //         attributes: ["firstName", "lastName", "email"],
  //       },
  //     ],
  //   });

  //   const doctor = await models.doctor.findOne({
  //     where: {
  //       doctorId: doctorId,
  //     },
  //     include: [
  //       {
  //         model: models.users,
  //         attributes: ["firstName", "lastName", "email"],
  //       },
  //     ],
  //   });

  //   const pet = await models.Pet.findOne({
  //     where: {
  //       pet_id: petId,
  //     },
  //   });

  //   const slot = await models.slot.findOne({
  //     where: {
  //       slotId: slotId,
  //     },
  //   });

  //   res.status(200).send({
  //     appoint,
  //     client,
  //     doctor,
  //     pet,
  //     slot,
  //   });
  // } catch (error) {
  //   console.log(error.message);
  // }
}


async function getAllPets(req, res) {
  try {
    const pets = await models.Pet.findAll();
    const count = await models.Pet.count();
    res.status(200).json({
      response: pets,
      petCount: count,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllPetsOfClientById(req, res) {
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

async function getSinglePet(req, res) {
  const { id } = req.query;
  try {
    const pet = await models.Pet.findOne({
      where: {
        pet_id: id,
      },
    });
    res.status(200).send(pet)
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllReviewsOfDoctor(req, res) {
  try {
    const reviews = await models.Review.findAll({
      where: {
        doctorId: req.params.id,
      },
    });
    res.status(200).json({
      response: reviews,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createAdmin(req, res) {
  let userData = req.body;
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

      admin = await models.admin.create({
        ...userData.admin,
      });
      await existingUser.setAdmin(admin);
      res.status(200).json({
        existingUser: existingUser,
        admin: admin,
        // token: token,
      });
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;

      user = await models.users.create({
        ...userData,
      });

      // console.log("user data", user);

      admin = await models.admin.create({
        ...userData.admin,
      });
      await user.setAdmin(admin);
      res.status(200).json({
        user: user,
        admin: admin,
      });
    }
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}

async function doctorApproval(req, res) {
  try {
    const doctor = await models.Doctor.findOne({
      where: {
        id: req.body.id,
      },
    });
    doctor.update({
      isApproved: req.body.isApproved,
    });
    res.status(200).json({
      response: doctor,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function reviewApproval(req, res) {
  try {
    const review = await models.Review.findOne({
      where: {
        id: req.body.id,
      },
    });
    review.update({
      isApproved: req.body.isApproved,
    });
    res.status(200).json({
      response: review,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createDoctor(req, res) {
  let { doctor } = req.body;
  console.log("data", doctor);
  let existingUser;
  let user;
  try {
    existingUser = await models.users.findOne({
      where: {
        email: doctor.email,
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

      doctor = await models.doctor.create({
        ...doctor.doctor,
      });
      await existingUser.setDoctor(doctor);

      res.status(200).json({
        user: existingUser,
        // token: token,
        doctor: doctor,
      });
    } else {
      const hashedPassword = await bcrypt.hash(doctor.password, saltRounds);
      doctor.password = hashedPassword;

      console.log("user data", existingUser);
      user = await models.users.create({
        ...doctor,
      });
      doctor = await models.doctor.create({
        ...doctor.doctor,
      });

      await user.setDoctor(doctor);

      res.status(200).json({
        user: user,
        // token: token,
        doctor: doctor,
      });
    }
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}

async function getAllPayments(req, res) { }

async function getAllPaymentsOfClientById(req, res) { }
module.exports = {
  getAllDoctors,
  getSingleDoctor,
  getAllclients,
  getSingleClient,
  getAllAppointments,
  getAllAppointmentsOfDoctorById,
  getAllAppointmentsOfClientById,
  getAllPets,
  getAllPetsOfClientById,
  getSinglePet,
  getAllReviewsOfDoctor,
  createAdmin,
  doctorApproval,
  reviewApproval,
  getAllPayments,
  getAllPaymentsOfClientById,
  getSingleAppointment,
  createDoctor,
  getSingleAppointmentById,
  getAllAppointmentsOfAdmin
};
