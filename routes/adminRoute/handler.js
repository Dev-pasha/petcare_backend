const { models } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "hakoonamatata"; // Replace with your actual secret key
const saltRounds = 10; // Number of salt rounds for bcrypt

async function getAllDoctors(req, res) {
  try {
    const doctors = await models.Doctor.findAll();
    res.status(200).json({
      response: doctors,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleDoctor(req, res) {
  try {
    const doctor = await models.Doctor.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      response: doctor,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllclients(req, res) {
  try {
    const clients = await models.Client.findAll();
    res.status(200).json({
      response: clients,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleClient(req, res) {
  try {
    const client = await models.Client.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      response: client,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllAppointments(req, res) {
  try {
    const appointments = await models.Appointment.findAll();
    res.status(200).json({
      response: appointments,
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
  try {
    const appointments = await models.Appointment.findAll({
      where: {
        clientId: req.params.id,
      },
    });
    res.status(200).json({
      response: appointments,
    });
  } catch (error) {
    console.log(error.message);
  }
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
  try {
    const pets = await models.Pet.findAll({
      where: {
        clientId: req.params.id,
      },
    });
    res.status(200).json({
      response: pets,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getSinglePet(req, res) {
  try {
    const pet = await models.Pet.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      response: pet,
    });
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

async function getAllPayments(req, res) {}

async function getAllPaymentsOfClientById(req, res) {}
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
};
