const { Op } = require("sequelize");
const { models } = require("../../models");
const { userType } = require("../../routes/userTypes");

const createAdminProfileInStorage = async ({ data }) => {
  let userData = data;
  let existingUser;
  try {
    existingUser = await models.users.findOne({
      where: {
        email: userData.email,
        type: userData.type,
      },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await models.users.create({
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      type: userData.type,
      meta: userData.meta,
      dateOfBirth: userData.dateOfBirth,
      phoneNumber: userData.phoneNumber,
    });

    const _id = user.id;
    console.log("user id ", _id);
    // console.log("user with id " + user.id + " created successfully.");

    // const exsistingAdmin = await models.admin.create({
    //   where: {
    //     user_id: _id,
    //   },
    // });

    // if (exsistingAdmin) {
    //   console.log("admin already exsist");
    // }

    const admin = await models.admin.create({
      userName: userData.admin.userName,
      salary: userData.admin.salary,
      notes: userData.admin.notes,
      profilePicture: userData.admin.profilePicture,
      userId: _id,
      where: {
        userName: userData.admin.userName,
      },
    });

    console.log(admin);

    // const [admin, createdAdmin] = await models.admin.create({
    //   where: {
    //     user_id: user.id,
    //   },
    //   defaults: {
    //     salary: userData.admin.salary,
    //     notes: userData.admin.notes,
    //     profilePicture: userData.admin.profilePicture,
    //     user_id: user.id,
    //   },
    // });
    // // admin['user_id'] = user.id;
    // console.log("admin", admin);
    // await admin.save();

    // console.log("admin with " + adminId + " created successfully.");
  } catch (error) {
    console.error("Error finding user:", error.message);
  }

  // console.log("here",existingUser)
  // try {

  //   console.log("user", user);

  //   // console.log(user);
  //   console.log("user created successfully.");
  // } catch (e) {
  //   console.log(e.message);
  // }

  // if (existingUser) {
  //   console.log(
  //     "An admin account with the provided username already exists."
  //   );
  //   return;
  // }

  // console.log("User", user);
  // console.log(user.dataValues.user_id)
  // console.log(user.id);
  // console.log(data.admin.salary);

  // const [admin, createdAdmin] = await models.admin.findOrCreate({
  //   where: {
  //     user_id: user.id,
  //   },
  //   defaults: {
  //     salary: data.admin.salary,
  //     notes: data.admin.notes,
  //     profilePicture: data.admin.profilePicture,
  //   },
  // });

  // console.log("admin", admin);
  // console.log("createdAdmin", createdAdmin);

  // const adminwithUser = await models.admin.create({
  //   salary: data.admin.salary,
  //   notes: data.admin.notes,
  //   profilePicture: data.admin.profilePicture,
  //   user_id: user.id,
  // });

  // console.log("admin here", adminwithUser);

  // salary: data.admin.salary,
  //     notes: data.admin.notes,
  //     profilePicture: data.admin.profilePicture,
  // console.log("admin which is created", adminwithUser);
  // Create an admin profile linked to the user
  // const adminProfile = await models.admin.create({
  //   salary: data.admin.salary,
  //   notes: data.admin.notes,
  //   profilePicture: data.admin.profilePicture,
  // });

  // console.log(
  //   `Admin profile created for user ${data.userName} with id ${user.id}`
  // );
  // } catch (error) {
  //   console.error("Error creating admin profile:", error);
  // }
};

const createClientProfileInStorage = async ({ data }) => {
  const { userName, firstName, lastName, email, password, phoneNumber } = data;
  try {
    const client = await models.Client.findOne({
      where: {
        userName: userName,
        email: email,
      },
    });
    if (client) {
      throw new Error("Client already exists");
    }
    const newClient = await models.Client.create({
      userName,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    return newClient;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};
const createDoctorProfileInStorage = async ({ data }) => {
  try {
    const { userName, email } = data;

    const findExsisting = await models.admin.findOne({
      where: {
        where: {
          userName: userName,
          email: email,
        },
      },
    });
    if (findExsisting) {
      throw new Error("doctor already exists");
    }
    const doctor = await models.Doctor.create({ data });
    return doctor;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};
const createSupportProfileInStorage = async (data) => {
  try {
    const support = await models.Support.create(data);
    return support;
  } catch (error) {
    throw error.message;
  }
};
const getAdminsProfileInStorage = async () => {
  try {
    const admins = await models.admin.findAll();
    return admins;
  } catch (error) {
    throw error.message;
  }
};
const getClientsProfileInStorage = async () => {
  try {
    const clients = await models.Client.findAll();
    return clients;
  } catch (error) {
    throw error.message;
  }
};
const getDoctorsProfileInStorage = async () => {
  try {
    const doctors = await models.Doctor.findAll();
    return doctors;
  } catch (error) {
    throw error.message;
  }
};
const getSupportsProfileInStorage = async () => {
  try {
    const supports = await models.Support.findAll();
    return supports;
  } catch (error) {
    throw error.message;
  }
};
const getSingleAdminsProfileInStorage = async (id) => {
  try {
    const admin = await models.Admin.findOne({ where: { id: id } });
    return admin;
  } catch (error) {
    throw error.message;
  }
};

const getSingleClientsProfileInStorage = async (id) => {
  try {
    const client = await models.Client.findOne({ where: { id: id } });
    return client;
  } catch (error) {
    throw error.message;
  }
};

const getSingleDoctorsProfileInStorage = async (id) => {
  try {
    const doctor = await models.Doctor.findOne({ where: { id: id } });
    return doctor;
  } catch (error) {
    throw error.message;
  }
};

const getSingleSupportsProfileInStorage = async (id) => {
  try {
    const support = await models.Support.findOne({ where: { id: id } });
    return support;
  } catch (error) {
    throw error.message;
  }
};

const deleteAdminProfileInStorage = async (id) => {
  try {
    const admin = await models.Admin.destroy({ where: { id: id } });
    return true;
  } catch (error) {
    throw error.message;
  }
};

const deleteClientProfileInStorage = async (id) => {
  try {
    const client = await models.Client.destroy({ where: { id: id } });
    return true;
  } catch (error) {
    throw error.message;
  }
};

const deleteDoctorProfileInStorage = async (id) => {
  try {
    const doctor = await models.Doctor.destroy({ where: { id: id } });
    return true;
  } catch (error) {
    throw error.message;
  }
};

const deleteSupportProfileInStorage = async (id) => {
  try {
    const support = await models.Support.destroy({ where: { id: id } });
    return true;
  } catch (error) {
    throw error.message;
  }
};

const updateAdminProfileInStorage = async (id, data) => {
  try {
    const exsistingUser = await models.admin.findOne({ where: { id: id } });
    if (!exsistingUser) {
      throw new Error("User not found");
    }
    const updatedUser = await models.admin.update(data);
    return updatedUser;
  } catch (error) {
    throw error.message;
  }
};

const updateClientProfileInStorage = async (id, data) => {
  try {
    const exsistingUser = await models.Client.findOne({ where: { id: id } });
    if (!exsistingUser) {
      throw new Error("User not found");
    }
    const updatedUser = await models.Client.update(data);
    return updatedUser;
  } catch (error) {
    throw error.message;
  }
};

const updateDoctorProfileInStorage = async (id, data) => {
  try {
    const exsistingUser = await models.Doctor.findOne({ where: { id: id } });
    if (!exsistingUser) {
      throw new Error("User not found");
    }
    const updatedUser = await models.Doctor.update(data);
    return updatedUser;
  } catch (error) {
    throw error.message;
  }
};

const updateSupportProfileInStorage = async (id, data) => {
  try {
    const exsistingUser = await models.Support.findOne({ where: { id: id } });
    if (!exsistingUser) {
      throw new Error("User not found");
    }
    const updatedUser = await models.Support.update(data);
    return updatedUser;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  createAdminProfileInStorage,
  createClientProfileInStorage,
  createDoctorProfileInStorage,
  createSupportProfileInStorage,
  getAdminsProfileInStorage,
  getClientsProfileInStorage,
  getDoctorsProfileInStorage,
  getSupportsProfileInStorage,
  getSingleAdminsProfileInStorage,
  getSingleClientsProfileInStorage,
  getSingleDoctorsProfileInStorage,
  getSingleSupportsProfileInStorage,
  deleteAdminProfileInStorage,
  deleteClientProfileInStorage,
  deleteDoctorProfileInStorage,
  deleteSupportProfileInStorage,
  updateAdminProfileInStorage,
  updateClientProfileInStorage,
  updateDoctorProfileInStorage,
  updateSupportProfileInStorage,
};
