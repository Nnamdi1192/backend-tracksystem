const mongoose = require("mongoose");
const truckModel = mongoose.Schema({
  number: {
    type: String,
    required: [true, "Truck number is required"],
    unique: [true, "truck number already exists"],
    lowercase: true,
  },

  driver: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  capacity: {
    type: String,
    required: [true, "truck capacity is required"],
    enum: ["15 tons", "30 tons", "40 tons", "50 tons"],
    lowercase: true,
  },
});

module.exports = mongoose.model("Truck", truckModel);
