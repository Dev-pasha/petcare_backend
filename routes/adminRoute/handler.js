const { models } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../jobs/node-mailer-service");
const { parse } = require("dotenv");
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
    res.status(200).send(appointments);
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

    console.log("appoint", appoint);
    res.status(200).send(appoint);
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
  const { id } = req.query;
  console.log("appointmentClient", id);
  try {
    const appointments = await models.Appointment.findAll({
      where: {
        clientId: id,
      },
    });
    res.status(200).send(appointments);
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
    res.status(200).send(pet);
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

      await sendEmail({
        to: existingUser.email,
        subject: "Doctor Approval",
        text: "Your Request has been approved, Thanks for being a part of PetCare365. use your email and previous profile passowrd to login",
      });

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

      await sendEmail({
        to: user.email,
        subject: "Doctor Approval",
        text: "Your Request has been approved, Thanks for being a part of PetCare365. use your email and password is" + doctor.password,
      });

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

async function deleteDoctor(req, res) {
  const { id } = req.query;
  try {
    const doctor =
      (await models.doctor.findOne({
        where: {
          doctorId: id,
        },
      })) - (await doctor.destroy());

    res.status(200).send({
      message: "doctor deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllRequests(req, res) {
  const { requestType } = req.query;
  try {
    const requests = await models.request.findAll({
      where: {
        requestType: requestType,
      },
    });
    res.status(200).send(requests);
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleRequest(req, res) {
  const { requestId } = req.query;
  try {
    const request = await models.request.findOne({
      where: {
        requestId: requestId,
      },
    });
    res.status(200).send(request);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateStatus(req, res) {
  const { requestId } = req.query;
  try {
    const exsistingRequest = await models.request.findOne({
      where: {
        requestId: requestId,
      },
    });

    await exsistingRequest.update({
      requestStatus: "Approved",
    });

    // send an Email to the resource person of simple contact query
    if (exsistingRequest.requestType === "contact_query") {
      await sendEmail({
        to: exsistingRequest.requestResourceEmail,
        subject: "Request Approved",
        text: "Your Request has been approved, we will make sure to contact you soon.",
      });
    }

    if (exsistingRequest.requestType === "contact_query") {
      await sendEmail({
        to: exsistingRequest.requestResourceEmail,
        subject: "Request Approved PetCare 365",
        text: "Your Request has been approved, Thanks for being a part of PetCare365. Our administrator will contact you soon. Please keep in touch for further verification.",
      });
    }

    res.status(200).send({
      message: "Request Approved",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllBlogs(req, res) {
  let { blogCategory } = req.query;
  try {
    if (blogCategory) {
      const blogs = await models.blog.findAll({
        // check a like query

        where: {
          blogCategory: blogCategory,
        },
      });
      console.log(blogs);
      res.status(200).send(blogs);
    } else {
      const blogs = await models.blog.findAll();
      res.status(200).send(blogs);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleBlog(req, res) {
  const { id } = req.query;
  try {
    const blog = await models.blog.findOne({
      where: {
        blogId: id,
      },
    });
    res.status(200).send(blog);
  } catch (error) {
    console.log(error.message);
  }
}

async function createBlog(req, res) {
  let { blog } = req.body;

  try {
    const newBlog = await models.blog.create({
      blogTitle: blog.blogTitle,
      blogDescription: blog.blogDescription,
      blogCategory: blog.blogCategory,
      timeToRead: blog.timeToRead,
      upVotes: parseInt(blog.upVotes),
      downVotes: parseInt(blog.downVotes),
      blogAuthor: blog.blogAuthor,
      blogImage: ["none"],
      admin_id: 1,
    });
    res.status(200).send(newBlog);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateBlog(req, res) {
  const { blog } = req.body;
  // console.log("blog", blog);
  try {
    const exsistingBlog = await models.blog.findOne({
      where: {
        blogId: blog.blogId,
      },
    });

    console.log("exsistingBlog", exsistingBlog);

    await exsistingBlog.update({
      blogTitle: blog.blogTitle,
      blogDescription: blog.blogDescription,
      blogCategory: blog.blogCategory,
      timeToRead: blog.timeToRead,
      upVotes: parseInt(blog.upVotes),
      downVotes: parseInt(blog.downVotes),
      blogAuthor: blog.blogAuthor,
      blogImage: ["none"],
      admin_id: 1,
    });

    res.status(200).send({
      message: "blog updated",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteBlog(req, res) {
  const { id } = req.query;
  try {
    const blog = await models.blog.findOne({
      where: {
        blogId: id,
      },
    });
    await blog.destroy();
    res.status(200).send({
      message: "blog deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getStats(req, res) {
  try {
    const doctors = await models.doctor.count();
    const clients = await models.client.count();
    const appointments = await models.Appointment.count();
    const pets = await models.Pet.count();

    res.status(200).send({
      doctors: doctors,
      clients: clients,
      appointments: appointments,
      pets: pets,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllNotifications(req, res) {
  const { id } = req.query
  try {
    // client_signup
    const client_signup = await models.Notification.findAll({
      where: {
        actionType: "client_signup",
        isRead: false,
        userId: id
      },
    });
    const client_signup_count = await models.Notification.count({
      where: {
        actionType: "client_signup",
        isRead: false,
        userId: id

      },
    });

    // appointment
    const appointment = await models.Notification.findAll({
      where: {
        actionType: "appointment",
        isRead: false,
        userId: id

      },
    });

    const appointment_count = await models.Notification.count({
      where: {
        actionType: "appointment",
        isRead: false,
        userId: id

      },
    });

    // request
    const request = await models.Notification.findAll({
      where: {
        actionType: "request",
        isRead: false,
        userId: id

      },
    });

    const request_count = await models.Notification.count({
      where: {
        actionType: "request",
        isRead: false,
        userId: id

      },
    });

    // new_doctor_request
    const new_doctor_request = await models.Notification.findAll({
      where: {
        actionType: "new_doctor_request",
        isRead: false,
        userId: id

      },
    });

    const new_doctor_request_count = await models.Notification.count({
      where: {
        actionType: "new_doctor_request",
        isRead: false,
        userId: id

      },
    });

    res.status(200).send({
      client_signup: client_signup,
      client_signup_count: client_signup_count,
      appointment: appointment,
      appointment_count: appointment_count,
      request: request,
      request_count: request_count,
      new_doctor_request: new_doctor_request,
      new_doctor_request_count: new_doctor_request_count,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function updateNotification(req, res) {
  const { id } = req.query;
  try {
    const notification = await models.Notification.findOne({
      where: {
        id: id,
      },
    });

    await notification.update({
      isRead: true,
    });

    res.status(200).send({
      message: "notification updated",
    });
  } catch (error) {
    console.log(error.message);
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
  getAllAppointmentsOfAdmin,
  deleteDoctor,
  getAllRequests,
  getSingleRequest,
  updateStatus,
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getStats,
  getAllNotifications,
  updateNotification,
};
