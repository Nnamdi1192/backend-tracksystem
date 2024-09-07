const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const AppError = require("../utils/commonClass");
const { asyncFunction } = require("../utils/commonFunctions");

const createUser = asyncFunction(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    next(new AppError("Unable to get users", 500));
  }
};

module.exports = { createUser, getUsers };
