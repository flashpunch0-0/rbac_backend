const express = require("express");
const { connectDatabase } = require("../config/db");

const router = express.Router();

// creating routes ROLE BSED
// admin rout
const adminCheck = (req, res) => {
  connectDatabase();
  res.status(200).send("Admin online");
};

// Moderator and Admin route controller
const moderatorCheck = (req, res) => {
  connectDatabase();
  res.status(200).send("Moderator and admin online");
};

// User route controller
const userCheck = (req, res) => {
  connectDatabase();
  res.status(200).send(`Hello user ${req.user.name}!`);
};

module.exports = {
  adminCheck,
  moderatorCheck,
  userCheck,
};
