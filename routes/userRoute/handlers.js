const {
  loginUserInStorage,
  registerUserInStorage,
} = require("../../storage/user/index");
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
    try {
        const { email, password } = req.body;
        const response = await loginUserInStorage({ email, password });
        res.status(200).json({
        message: "User logged in successfully",
        data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
  register,
  login,
};
