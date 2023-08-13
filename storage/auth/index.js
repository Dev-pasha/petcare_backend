const { Op } = require("sequelize");
const { models } = require("../../models");

const registerUserInStorage = async ({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
}) => {
  try {
    const exsistingUser = await models.users.findOne({
      where: {
        email: email,
      },
    });
    if (exsistingUser) throw new Error("User already exists");



    const user = await models.users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });

    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const loginUserInStorage = async ({ email, password }) => {
  try {
    const user = await models.users.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    // need to add bycrypt jwt

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUserInStorage, loginUserInStorage };
