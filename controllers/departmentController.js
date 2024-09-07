const Department = require("../model/DepartmentModel");
const { findOne, findOneAndUpdate } = require("../model/UserModel");
const AppError = require("../utils/commonClass");
const { asyncFunction } = require("../utils/commonFunctions");

const createDepartment = asyncFunction(async (req, res, next) => {
  // get department data
  const { name, code } = req.body;

  if (!Boolean(name) || !Boolean(code)) {
    console.log(name, code);
    throw new AppError("Department details not found", 500);
  }

  const newDept = await Department.create({ name, code });

  res.status(201).json({
    status: "success",
    data: {
      department: newDept,
    },
  });
});

const updateDepartment = asyncFunction(async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  const dept = await Department.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });
  if (dept === null)
    return new AppError(
      `Department with id ${id} do not exist in our collection.`
    );

  res.status(200).json({
    status: "success",
    data: {
      dept: dept,
    },
  });
});

const deleteDepartment = asyncFunction(async (req, res, next) => {
  const { id } = req.params;

  const delRep = await Department.findOneAndDelete({ _id: id });

  res.status(200).json({
    status: "success",
    message: "Department Deleted",
  });
});

module.exports = { createDepartment, updateDepartment, deleteDepartment };
