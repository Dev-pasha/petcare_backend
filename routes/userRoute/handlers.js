const { models } = require("../../models");

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

async function createProfile(req, res) {
  try {
    console.log(req.body);
    const { type } = req.body;
    const data = req.body;
    let profile;
    if (type === "ADMIN") {
      profile = await createAdminProfileInStorage({ data });
      res.status(200).json({
        message: "admin profile created successfully",
        profile,
      });
    }
    if (type === "CLIENT") {
      profile = await createClientProfileInStorage({ data });
      res.status(200).json({
        message: "client profile created successfully",
        profile,
      });
    }

    if (type === "DOCTOR") {
      profile = await createDoctorProfileInStorage({ data });
      res.status(200).json({
        message: "doctor profile created successfully",
        profile,
      });
    }

    if (type === "SUPPORT") {
      profile = await createSupportProfileInStorage({ data });
      res.status(200).json({
        message: "support profile created successfully",
        profile,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProfiles(req, res) {
  try {
    const { type } = req.query;
    let profiles;
    if (type === "ADMIN") {
      profiles = await getAdminsProfileInStorage();
      res.status(200).json({
        message: "admin profile fetched successfully",
        profiles,
      });
    }
    if (type === "CLIENT") {
      profiles = await getClientsProfileInStorage();
      res.status(200).json({
        message: "client profile fetched successfully",
        profiles,
      });
    }
    if (type === "DOCTOR") {
      profiles = await getDoctorsProfileInStorage();
      res.status(200).json({
        message: "doctor profile fetched successfully",
        profiles,
      });
    }
    if (type === "SUPPORT") {
      profiles = await getSupportsProfileInStorage();
      res.status(200).json({
        message: "support profile fetched successfully",
        profiles,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleProfile(req, res) {
  try {
    const { type, id } = req.query;
    console.log(type, id);
    let profile;
    if (type === "ADMIN") {
      profile = await getSingleAdminsProfileInStorage(id);
      res.status(200).json({
        message: "admin profile fetched successfully",
        profile,
      });
    }
    if (type === "CLIENT") {
      profile = await getSingleClientsProfileInStorage({ id });
      res.status(200).json({
        message: "client profile fetched successfully",
        profile,
      });
    }
    if (type === "DOCTOR") {
      profile = await getSingleDoctorsProfileInStorage({ id });
      res.status(200).json({
        message: "doctor profile fetched successfully",
        profile,
      });
    }
    if (type === "SUPPORT") {
      profile = await getSingleSupportsProfileInStorage({ id });
      res.status(200).json({
        message: "support profile fetched successfully",
        profile,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProfile(req, res) {
  try {
    const { type, id } = req.query;
    console.log(type, id);
    let profile;
    if (type === "ADMIN") {
      profile = await deleteAdminProfileInStorage({ id });
      res.status(200).json({
        message: "admin profile deleted successfully",
        profile,
      });
    }
    if (type === "CLIENT") {
      profile = await deleteClientProfileInStorage({ id });
      res.status(200).json({
        message: "client profile deleted successfully",
        profile,
      });
    }
    if (type === "DOCTOR") {
      try {
        profile = await deleteDoctorProfileInStorage({id});
        res.status(200).json({
          message: "doctor profile deleted successfully",
          profile,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    if (type === "SUPPORT") {
      profile = await deleteSupportProfileInStorage({ id });
      res.status(200).json({
        message: "support profile deleted successfully",
        profile,
      });
    }
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

module.exports = {
  createProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
