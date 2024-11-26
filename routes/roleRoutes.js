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
router.get("/admin", authorize(["admin"]), adminCheck);

//
router.post("/moderate", authorize(["admin", "moderator"]), moderatorCheck);

//
router.get("/profile", authorize(["user"]), userCheck);
router.get(
  "/userPermission",
  authorize(["user", "admin"]),
  permissionCheck("read"),
  userPermissionCheck
);

// router.post("/resource", authorize(["admin", "user"]), (req, res) => {
//   res.status(200).send("Resource created successfully.");
// });
//
module.exports = router;
