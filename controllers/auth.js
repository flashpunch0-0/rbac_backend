const User = require("../models/user");
const jwt = require("jsonwebtoken");

//  user register controller function
const registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ username, name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

module.exports = { registerUser };
