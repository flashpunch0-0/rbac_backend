const express = require("express");

const router = express.Router();

// creating routes ROLE BSED
// admin rout
exports.adminController = (req, res) => {
  res.status(200).send("Admin online");
};

// Moderator and Admin route controller
exports.moderatorController = (req, res) => {
  res.status(200).send("Moderator and admin online");
};

// User route controller
exports.userController = (req, res) => {
  res.status(200).send(`Hello user ${req.user.name}!`);
};

module.exports = router;
