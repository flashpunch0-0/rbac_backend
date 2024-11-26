const { permissions } = require("../models/role");
function permissionCheck(action) {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = permissions[userRole] || [];

    if (!userPermissions.includes(action)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
}

module.exports = { permissionCheck };
