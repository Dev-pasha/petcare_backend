const { models } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const secretKey = "hakoonamatata";
const saltRounds = 10;

async function createScheduleOfDoctor(req, res) {
  const { slotDate, startTime, endTime, doctorId } = req.body;

  let convertedSlotDate = slotDate + " 05:00:00+05";
  console.log({ slotDate, startTime, endTime, doctorId });

  //
  const exsistanceSlot = await models.slot.findOne({
    where: {
      slotDate: convertedSlotDate,
      doctorId: doctorId,
    },
  });

  if (exsistanceSlot) {
    console.log("slot already exists");
    res.status(400).send("slot already exists");
    return;
  }

  //
  let intervalMinutes = 30;
  let scheduleResponse;
  slotStatus = "available";

  try {
    const generatedSlots = calculateTimeSlots({
      startTime: startTime,
      endTime: endTime,
      intervalMinutes,
    });

    for (let i = 0; i < generatedSlots.length; i++) {
      const slotData = {
        slotDate,
        startTime: generatedSlots[i].start,
        endTime: generatedSlots[i].end,
        doctorId,
        slotStatus,
      };

      scheduleResponse = await models.slot.create({
        doctorId: doctorId,
        startTime: slotData.startTime,
        endTime: slotData.endTime,
        slotDate: slotData.slotDate,
        slotStatus: slotData.slotStatus,
      });
    }

    res.status(200).send(scheduleResponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateScheduleOfDoctor(req, res) {
  const { slotId } = req.body;
  console.log({ slotId });
  let updatedSlot;
  try {
    const exsistingSlot = await models.slot.findOne({
      where: {
        slot_id: slotId,
      },
    });

    console.log(exsistingSlot.slotStatus);
    if (exsistingSlot.slotStatus === "available") {
      updatedSlot = await exsistingSlot.update({
        slotStatus: "Unavailable",
      });
    } else {
      updatedSlot = await exsistingSlot.update({
        slotStatus: "available",
      });
    }

    console.log(updatedSlot);

    res.status(200).send(updatedSlot);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getScheduleOfDoctor(req, res) {
  try {
    const { doctorId, slotDate } = req.query;
    const response = await models.slot.findAll({
      where: {
        doctorId: doctorId,
        slotDate: slotDate,
        slotStatus: {
          [Op.not]: "Pending",
        },
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteScheduleOfDoctor(req, res) {
  const { slotId } = req.query;
  try {
    const response = await models.slot.destroy({
      where: {
        slotId: slotId,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createDoctor(req, res) {
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

      doctor = await models.doctor.create({
        ...userData.doctor,
      });
      await existingUser.setDoctor(doctor);

      res.status(200).json({
        user: existingUser,
        // token: token,
        doctor: doctor,
      });
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;

      console.log("user data", existingUser);
      user = await models.users.create({
        ...userData,
      });
      doctor = await models.doctor.create({
        ...userData.doctor,
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

async function updateDoctor(req, res) {
  const { doctorId } = req.query;
  const data = req.body;
  try {
    const exsisitingDoctor = await models.doctor.findOne({
      where: {
        doctorId: doctorId,
      },
    });

    const updatedDoctor = await exsisitingDoctor.update(data);
    res.status(200).json({
      message: "doctor updated successfully",
      updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllAppointmentsOfDoctor(req, res) {
  const { id } = req.query;
  try {
    const successAppointments = await models.Appointment.findAll({
      where: {
        doctorId: id,
        appointmentStatus: "success",
      },
    });
    const successCount = await models.Appointment.count({
      where: {
        doctorId: id,
        appointmentStatus: "success",
      },
    });

    const pendingAppointments = await models.Appointment.findAll({
      where: {
        doctorId: id,
        appointmentStatus: "pending",
      },
    });
    const pendingCount = await models.Appointment.count({
      where: {
        doctorId: id,
        appointmentStatus: "pending",
      },
    });

    const cancelledAppointments = await models.Appointment.findAll({
      where: {
        doctorId: id,
        appointmentStatus: "cancelled",
      },
    });

    const cancelledCount = await models.Appointment.count({
      where: {
        doctorId: id,
        appointmentStatus: "cancelled",
      },
    });

    res.status(200).send({
      successAppointments,
      successCount,
      pendingAppointments,
      pendingCount,
      cancelledAppointments,
      cancelledCount,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getSingleAppointmentOfDoctor(req, res) {
  const { id } = req.query;
  try {
    const appointmentResponse = await models.Appointment.findOne({
      where: {
        appointmentId: id,
      },
    });

    const pet = await models.Pet.findOne({
      where: {
        petId: appointmentResponse.petId,
      },
    });

    const client = await models.client.findOne({
      where: {
        clientId: appointmentResponse.clientId,
      },
    });

    const clientUser = await models.users.findOne({
      where: {
        userId: client.user_id,
      },
    });

    console.log(appointmentResponse, pet, clientUser);

    res.status(200).send({
      appointmentResponse,
      pet,
      clientUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function convertTo24Hour(time12) {
  const [time, period] = time12.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    return `${hours + 12}:${minutes}`;
  }

  if (period === "AM" && hours === 12) {
    return `00:${minutes}`;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

function convertTo12Hour(time24) {
  console.log("here check 2");
  const [hours, minutes] = time24.split(":").map(Number);

  if (hours === 0) {
    return `12:${minutes.toString().padStart(2, "0")} AM`;
  } else if (hours === 12) {
    return `12:${minutes.toString().padStart(2, "0")} PM`;
  } else if (hours > 12) {
    return `${hours - 12}:${minutes.toString().padStart(2, "0")} PM`;
  } else {
    return `${hours}:${minutes.toString().padStart(2, "0")} AM`;
  }
}

function calculateTimeSlots({ startTime, endTime, intervalMinutes }) {
  const startTime24 = convertTo24Hour(startTime);
  const endTime24 = convertTo24Hour(endTime);

  console.log(startTime24, endTime24);
  const startDateTime = new Date(`1970-01-01 ${startTime24}`);
  const endDateTime = new Date(`1970-01-01 ${endTime24}`);

  const timeSlotDurationMilliseconds = intervalMinutes * 60 * 1000;
  let currentTime = startDateTime;

  const timeSlots = [];
  console.log("here check");

  while (currentTime <= endDateTime) {
    const startTime12 = convertTo12Hour(currentTime.toTimeString().slice(0, 5));
    const endTime12 = convertTo12Hour(
      new Date(currentTime.getTime() + timeSlotDurationMilliseconds)
        .toTimeString()
        .slice(0, 5)
    );

    const timeSlot = {
      start: startTime12,
      end: endTime12,
    };
    timeSlots.push(timeSlot);
    currentTime.setTime(currentTime.getTime() + timeSlotDurationMilliseconds);
  }

  return timeSlots;
}

async function getScheduleDatesOfDoctor(req, res) {
  const { doctorId } = req.query;
  console.log(doctorId);
  try {
    const response = await models.slot
      .findAll({
        where: {
          doctorId: doctorId,
        },
        attributes: ["slotDate"],
        group: ["slotDate"],
      })
      .then((projects) => projects.map((project) => project.slotDate));
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getSingleSlotOfDoctor(req, res) {
  const { slotId } = req.query;
  try {
    const response = await models.slot.findOne({
      where: {
        slotId: slotId,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function doctorByCategories(req, res) {
  try {
    const response = await models.doctor
      .findAll({
        attributes: ["specialization"],
        group: ["specialization"],
      })
      .then((category) => category.map((cat) => cat.specialization));

    console.log("response in category", response);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getDoctorsByCategory(req, res) {
  const { category } = req.query;
  try {
    const response = await models.doctor.findAll({
      where: {
        specialization: category,
      },
      include: [
        {
          model: models.users,
        },
      ],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getSingleDoctor(req, res) {
  const { id } = req.query;
  console.log(id);
  try {
    const response = await models.doctor.findOne({
      where: {
        doctorId: id,
      },
      include: [
        {
          model: models.users,
        },
      ],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPublicScheduleDatesOfDoctor(req, res) {
  const { doctorId } = req.query;
  try {
    // Get the current date and time
    const currentDate = new Date();

    const response = await models.slot
      .findAll({
        where: {
          doctorId: doctorId,
          slotStatus: "available",
        },
        attributes: ["slotDate"],
        group: ["slotDate"],
      })
      .then((projects) => {
        // Filter out dates that are not in the past
        return projects
          .map((project) => project.slotDate)
          .filter((slotDate) => new Date(slotDate) >= currentDate);
      });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getTimeSlotsOfDoctor(req, res) {
  const { doctorId, slotDate } = req.query;
  console.log(doctorId, slotDate);
  try {
    const response = await models.slot.findAll({
      where: {
        doctorId: doctorId,
        slotDate: slotDate,
        slotStatus: "available",
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getAllDoctors(req, res) {
  const { query } = req.query;
  console.log(query);
  try {
    const response = await models.doctor.findAll({
      where: {
        [Op.or]: [
          {
            specialization: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      include: [
        {
          model: models.users,
        },
      ],
    });
    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createScheduleOfDoctor,
  updateScheduleOfDoctor,
  getScheduleOfDoctor,
  deleteScheduleOfDoctor,
  createDoctor,
  updateDoctor,
  getAllAppointmentsOfDoctor,
  getSingleAppointmentOfDoctor,
  getScheduleDatesOfDoctor,
  getSingleSlotOfDoctor,
  doctorByCategories,
  getDoctorsByCategory,
  getSingleDoctor,
  getPublicScheduleDatesOfDoctor,
  getTimeSlotsOfDoctor,
  getAllDoctors,
};
