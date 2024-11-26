const express = require("express");
const cors = require("cors");
const { registerUser } = require("./controllers/auth");

require("dotenv").config;

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

router.post("/register", registerUser);
app.listen(3010, () => {
  console.log("Server is running on port:3010");
});
