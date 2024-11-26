const express = require("express");
const {
  adminController,
  moderatorController,
  userController,
} = require("../controllers/role");

const { authorize } = require("../middleware/authMiddleware");

const router = express.Router();
//
router.get("/admin", authorize(["admin"]), adminController);

//
router.post(
  "/moderate",
  authorize(["admin", "moderator"]),
  moderatorController
);

//
router.get("/profile", authorize(["user"]), userController);

//
module.exports = router;
