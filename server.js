const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const { connectDatabase } = require("./config/db.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.listen(3010, () => {
  console.log("Server is running on port:3010");
});
