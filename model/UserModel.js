const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "please provide your firstname"],
    },

    surname: {
      type: String,
      required: [true, "please provide your second name"],
    },

    othername: {
      type: String,
      default: "NA",
    },

    email: {
      type: String,
      require: [true, "please provide your email"],
      unique: [true, "email address already exists"],
      validate: [validator.isEmail, "please provide a valid email"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },

    dob: {
      type: Date,
      required: [true, "date of birth is required"],
    },

    phoneNumber: {
      type: String,
      required: [true, "please provide your phone number"],
      validate: [
        validator.isMobilePhone,
        "please provide a valid phone number",
      ],
    },

    password: {
      type: String,
      required: [true, "please provide a valid password"],
      minlength: 8,
    },

    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password are not the same",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // only run this function if the password was actully modified
  if (!this.isModified("password")) return next();

  // hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 6);

  // delete the confirm password field
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model("User", userSchema);
