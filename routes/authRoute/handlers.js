const {
  registerUserInStorage,
} = require("../../storage/auth/index");

const { models } = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = 'hakonamatata'

async function register(req, res) {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const response = await registerUserInStorage({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    res.status(200).json({
      message: "User registered successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password, userType } = req.body;
  console.log(req.body);

  try {
    // Find the user by email and user type
    const user = await models.users.findOne({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid password" });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user.userId, userType);

    // Return the token and user information (you can customize the response as needed)
    res.status(200).json({
      message: "Authentication successful",
      token,
      user: {
        userId: user.userId,
        email: user.email,
        type: userType
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

function generateToken(userId, userType) {
  const payload = {
    userId,
    userType,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
}

module.exports = {
  register,
  login,
};
