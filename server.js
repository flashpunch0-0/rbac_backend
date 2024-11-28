const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const roleRoutes = require("./routes/roleRoutes.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/request", roleRoutes);
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
