const mongoose = require("mongoose");

let conn = null;

exports.connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  if (conn == null) {
    console.log("Creating new connection to the database....");
    try {
      conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Database connection successful!");
    } catch (error) {
      console.error("Failed to connect to database:", error.message);
      throw error;
    }
    return conn;
  }

  console.log(
    "Connection already established, reusing the existing connection"
  );
};
