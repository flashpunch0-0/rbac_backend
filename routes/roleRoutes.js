const express = require("express");
const {
  adminCheck,
  moderatorCheck,
  userCheck,
  userPermissionCheck,
} = require("../controllers/role");

const { authorize } = require("../middleware/authMiddleware");
const { permissionCheck } = require("../middleware/permissionMiddleware");

const router = express.Router();
//
router.post("/admin", authorize(["admin"]), adminCheck);

//
router.post("/moderate", authorize(["admin", "moderator"]), moderatorCheck);

//
router.post("/user", authorize(["user"]), userCheck);
//
router.post(
  "/permissionRead",
  authorize(["user", "admin"]),
  permissionCheck("read"),
  userPermissionCheck
);
//
router.post(
  "/permissionDelete",
  authorize(["user", "admin", "moderator"]),
  permissionCheck("delete"),
  userPermissionCheck
);

module.exports = router;
