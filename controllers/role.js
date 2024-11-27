const express = require("express");
const { connectDatabase } = require("../config/db");

const router = express.Router();

// creating routes ROLE BSED
// admin rout
const adminCheck = (req, res) => {
  connectDatabase();
  res.status(200).send(`Admin online => ${req.user.name}: ${req.user.role}`);
};

// Moderator and Admin route controller
const moderatorCheck = (req, res) => {
  connectDatabase();
  res
    .status(200)
    .send(`Moderator or admin online =>  ${req.user.name} : ${req.user.role}`);
};

// User route controller
const userCheck = (req, res) => {
  connectDatabase();
  res.status(200).send(`Hello user ${req.user.name}!`);
};

const userPermissionCheck = (req, res) => {
  connectDatabase();
  res
    .status(200)
    .send(`Hello user ${req.user.name} you have permission to access`);
};

module.exports = {
  adminCheck,
  moderatorCheck,
  userCheck,
  userPermissionCheck,
};
