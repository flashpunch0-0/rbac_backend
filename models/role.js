const roles = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

const permissions = {
  admin: ["create", "read", "update", "delete"],
  user: ["read", "update"],
  moderator: ["read", "update", "moderate"],
};

module.exports = { roles, permissions };
