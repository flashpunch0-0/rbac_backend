const { connectDatabase } = require("../config/db");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../ActivityLogging/Logger");
//  generate jwt token
const generateToken = (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//  user register controller function
const registerUser = async (req, res) => {
  connectDatabase();
  const { username, name, email, password, role, tokenVersion } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      username,
      name,
      email,
      password,
      role,
      tokenVersion,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  connectDatabase();
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tokenVersion: user.tokenVersion,
        token: generateToken(user),
      });
    } else {
      logger.warn(`Failed login attempt for email: ${email}`);
      res.status(401).json({ message: "Invalid email or password" });
    }
    logger.info(`User logged in: ${email}`);
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  connectDatabase();
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    logger.warn(`Logout attempt without token`);
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, tokenVersion } = decrypted;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.tokenVersion !== tokenVersion) {
      return res.status(401).json({ message: "Invalid token" });
    }
    user.tokenVersion += 1;
    await user.save();
    logger.info(`User logged out: ${email}`);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error(`Error during logout: for  ${error.message}`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
module.exports = { registerUser, loginUser, logoutUser };
