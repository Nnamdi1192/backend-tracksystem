const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
    },

    code: {
      type: String,
      required: [true, "Department code is required, a three letter word"],
      minlength: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
