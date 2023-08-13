const { models } = require("../../models");
const querystring = require("querystring");

const {
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
} = require("../../storage/user/index");
const { userTypes } = require("../userTypes");

async function createProfile(req, res) {
  try {
    const { type } = req.body;
    const data = req.body;
    console.log(type);
    // console.log(data);
    let profile;

    profile = await createAdminProfileInStorage({ data });
    // console.log("herer");

    res.status(200).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProfiles(req, res) {
  try {
    const { type } = req.query;
    console.log(type);
    let profiles;
    if (type === "ADMIN") {
      profiles = await getAdminsProfileInStorage();
    }
    if (type === "CLIENT") {
      profiles = await getClientsProfileInStorage();
    }
    if (type === "DOCTOR") {
      profiles = await getDoctorsProfileInStorage();
    }
    if (type === "SUPPORT") {
      profiles = await getSupportsProfileInStorage();
    }
    res.status(200).json({
      message: "Profiles fetched successfully",
      profiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleProfile(req, res) {
  try {
    const { type, id } = req.params;
    let profile;
    if (type === "ADMIN") {
      profile = await getSingleAdminsProfileInStorage(id);
    } else if (type === "CLIENT") {
      profile = await getSingleClientsProfileInStorage(id);
    } else if (type === "DOCTOR") {
      profile = await getSingleDoctorsProfileInStorage(id);
    } else if (type === "SUPPORT") {
      profile = await getSingleSupportsProfileInStorage(id);
    }
    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const { type, id } = req.params;
    let profile;
    if (type === "ADMIN") {
      profile = await updateAdminProfileInStorage(id, req.body);
    } else if (type === "CLIENT") {
      profile = await updateClientProfileInStorage(id, req.body);
    } else if (type === "DOCTOR") {
      profile = await updateDoctorProfileInStorage(id, req.body);
    } else if (type === "SUPPORT") {
      profile = await updateSupportProfileInStorage(id, req.body);
    }
    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProfile(req, res) {
  try {
    const { type, id } = req.params;
    let profile;
    if (type === "ADMIN") {
      profile = await deleteAdminProfileInStorage(id);
    } else if (type === "CLIENT") {
      profile = await deleteClientProfileInStorage(id);
    } else if (type === "DOCTOR") {
      profile = await deleteDoctorProfileInStorage(id);
    } else if (type === "SUPPORT") {
      profile = await deleteSupportProfileInStorage(id);
    }
    res.status(200).json({
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { type } = req.body;
    const data = req.body;
    const response = await models.users.create(data);
    res.status(200).json({
      message: "User created successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
  createUser,
};
