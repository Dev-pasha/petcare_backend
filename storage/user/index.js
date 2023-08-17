const { Op, where } = require("sequelize");
const { models } = require("../../models");
const { userType } = require("../../routes/userTypes");

// working perfectly
const createAdminProfileInStorage = async ({ data }) => {
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
      admin = await models.admin.create({
        ...userData.admin,
      });
      await existingUser.setAdmin(admin);
      return { existingUser, admin };
    } else {
      user = await models.users.create({
        ...userData,
      });
      console.log("user data", user);
      admin = await models.admin.create({
        ...userData.admin,
      });
      await user.setAdmin(admin);
      return { user, admin };
    }
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};
// working perfectly
const createClientProfileInStorage = async ({ data }) => {
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
      client = await models.client.create({
        ...userData.client,
      });
      await existingUser.setClient(client);
      return { existingUser, client };
    } else {
      user = await models.users.create({
        ...userData,
      });
      client = await models.client.create({
        ...userData.client,
      });
      await user.setClient(client);
      return { user, client };
    }
  } catch (error) {
    throw error.message;
  }
};
// working perfectly
const createDoctorProfileInStorage = async ({ data }) => {
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
      doctor = await models.doctor.create({
        ...userData.doctor,
      });
      await existingUser.setDoctor(doctor);
      return { existingUser, doctor };
    } else {
      console.log("user data", existingUser);
      user = await models.users.create({
        ...userData,
      });
      doctor = await models.doctor.create({
        ...userData.doctor,
      });

      await user.setDoctor(doctor);
      return { user, doctor };
    }
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};
// working perfectly
const createSupportProfileInStorage = async ({ data }) => {
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
      const _id = existingUser.userId;

      const support = await models.support.create({
        ...userData.support,
        user_id: _id,
      });
      return { existingUser, support };
    } else {
      const user = await models.users.create({
        ...userData,
      });

      const [support, created] = await models.support.findOrCreate({
        where: { user_id: user.userId },
        defaults: {
          ...userData.support,
        },
      });
      return { user, support };
    }
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

const getAdminsProfileInStorage = async () => {
  try {
    const adminsCount = await models.admin.count();
    const admins = await models.admin.findAll({
      include: [
        {
          model: models.users,
        },
      ],
    });

    return { admins, adminsCount };
  } catch (error) {
    throw error.message;
  }
};

const getClientsProfileInStorage = async () => {
  try {
    const clientcount = await models.client.count();
    const clients = await models.client.findAll({
      include: [
        {
          model: models.users,
        },
      ],
    });
    return { clients, clientcount };
  } catch (error) {
    throw error.message;
  }
};
const getDoctorsProfileInStorage = async () => {
  try {
    const doctorsCount = await models.doctor.count();
    const doctors = await models.doctor.findAll({
      include: [
        {
          model: models.users,
        },
      ],
    });
    return { doctors, doctorsCount };
  } catch (error) {
    throw error.message;
  }
};
const getSupportsProfileInStorage = async () => {
  try {
    const supportsCount = await models.support.count();
    const supports = await models.support.findAll({
      include: [
        {
          model: models.users,
        },
      ],
    });
    return { supports, supportsCount };
  } catch (error) {
    throw error.message;
  }
};

const getSingleAdminsProfileInStorage = async (id) => {
  try {
    const admin = await models.admin.findOne({
      include: [{ model: models.users }],
      where: { adminId: id },
    });
    return admin;
  } catch (error) {
    throw error.message;
  }
};

const getSingleClientsProfileInStorage = async ({ id }) => {
  try {
    const requestedClient = await models.client.findOne({
      where: { clientId: id },
      include: [
        {
          model: models.users,
        },
      ],
    });

    return requestedClient;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

const getSingleDoctorsProfileInStorage = async ({ id }) => {
  try {
    const doctor = await models.doctor.findOne({
      where: { doctorId: id },
      include: [{ model: models.users }],
    });
    return doctor;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

const getSingleSupportsProfileInStorage = async ({ id }) => {
  try {
    const support = await models.support.findOne({
      where: { supportId: id },
      include: [{ model: models.users }],
    });
    return support;
  } catch (error) {
    throw error.message;
  }
};

const deleteAdminProfileInStorage = async ({ id }) => {
  let admi;
  try {
    admi = await models.admin.findOne({
      where: { adminId: id },
    });
    if (!admi) {
      throw new Error("Admin not found");
    }
    const _id = admi.user_id;
    const client = await models.client.findOne({
      where: {
        clientId: _id,
      },
    });

    const doctor = await models.doctor.findOne({
      where: {
        doctorId: _id,
      },
    });

    const support = await models.support.findOne({
      where: {
        supportId: _id,
      },
    });

    if (client || doctor || support) {
      await admi.destroy();
    } else {
      await models.users.destroy({
        where: {
          userId: _id,
        },
      });
      return "user profile deleted";
    }
    return;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

const deleteClientProfileInStorage = async ({ id }) => {
  let cli;
  try {
    cli = await models.client.findOne({
      where: { clientId: id },
    });

    if (!cli) {
      throw new Error("Client not found");
    }

    const _id = cli.user_id;
    const admin = await models.admin.findOne({
      where: {
        adminId: _id,
      },
    });

    const doctor = await models.doctor.findOne({
      where: {
        doctorId: _id,
      },
    });

    const support = await models.support.findOne({
      where: {
        supportId: _id,
      },
    });

    if (admin || doctor || support) {
      await cli.destroy();
    } else {
      await models.users.destroy({
        where: {
          userId: _id,
        },
      });
      return "user profile deleted";
    }
    return;
  } catch (error) {
    throw error.message;
  }
};

const deleteDoctorProfileInStorage = async ({ id }) => {
  let doc;
  try {
    doc = await models.doctor.findOne({
      where: { doctorId: id },
    });
    if (!doc) {
      throw new Error("Doctor not found");
    }

    const _id = doc.user_id;
    const client = await models.client.findOne({
      where: {
        clientId: _id,
      },
    });

    const admin = await models.admin.findOne({
      where: {
        adminId: _id,
      },
    });

    const support = await models.support.findOne({
      where: {
        supportId: _id,
      },
    });

    if (client || admin || support) {
      await doc.destroy();
    } else {
      await models.users.destroy({
        where: {
          userId: _id,
        },
      });
    }
    return;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

const deleteSupportProfileInStorage = async ({ id }) => {
  let sup;
  let _id;
  try {
    sup = await models.support.findOne({
      where: { supportId: id },
    });
    if (!sup) {
      throw new Error("Support not found");
    }

    _id = sup.user_id;
    console.log("user id from json", _id);

    const client = await models.client.findOne({
      where: {
        clientId: _id,
      },
    });

    const doctor = await models.doctor.findOne({
      where: {
        doctorId: _id,
      },
    });

    const admin = await models.admin.findOne({
      where: {
        adminId: _id,
      },
    });

    if (client || doctor || admin) {
      await sup.destroy();
    } else {
      await models.users.destroy({
        where: {
          userId: _id,
        },
      });
    }
    return;
  } catch (error) {
    console.log("in catch", error.message);
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
