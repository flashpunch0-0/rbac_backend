const express = require("express");
const { connectDatabase } = require("../config/db");
const logger = require("../ActivityLogging/Logger");
const router = express.Router();

// creating routes ROLE BSED
// admin rout
const adminCheck = (req, res) => {
  try {
    connectDatabase();
    logger.info(
      `Admin access: User ${req.user.name} with role ${req.user.role} accessed admin route.`
    );
    res.status(200).send(`Admin online => ${req.user.name}: ${req.user.role}`);
  } catch (error) {
    logger.error(`Error in adminCheck: ${error.message}`);
    res.status(500).send("Something went wrong.");
  }
};

// Moderator and Admin route controller
const moderatorCheck = (req, res) => {
  try {
    connectDatabase();
    logger.info(
      `Moderator/Admin access: User ${req.user.name} with role ${req.user.role} accessed moderator route.`
    );
    res
      .status(200)
      .send(
        `Moderator or admin online =>  ${req.user.name} : ${req.user.role}`
      );
  } catch (error) {
    logger.error(`Error in moderatorCheck: ${error.message}`);
    res.status(500).send("Something went wrong.");
  }
};

// User route controller
const userCheck = (req, res) => {
  try {
    connectDatabase();
    logger.info(`User access: User ${req.user.name} accessed user route.`);
    res.status(200).send(`Hello user ${req.user.name}!`);
  } catch (error) {
    logger.error(`Error in userCheck: ${error.message}`);
    res.status(500).send("Something went wrong.");
  }
};

const userPermissionCheck = (req, res) => {
  try {
    connectDatabase();
    logger.info(
      `Permission granted: User ${req.user.name} has permission to access this route.`
    );
    res
      .status(200)
      .send(`Hello user ${req.user.name} you have permission to access`);
  } catch (error) {
    logger.error(`Error in userPermissionCheck: ${error.message}`);
    res.status(500).send("Something went wrong.");
  }
};

module.exports = {
  adminCheck,
  moderatorCheck,
  userCheck,
  userPermissionCheck,
};
