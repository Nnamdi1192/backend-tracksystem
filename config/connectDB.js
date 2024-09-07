const mongoose = require("mongoose");
const AppError = require("../utils/commonClass");
const { errorHandler } = require("../controllers/errorHandlingConroller");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected to Mongodb...");
  } catch (err) {
    console.log("Unable to connect to database");
  }
};

module.exports = connectDB;
