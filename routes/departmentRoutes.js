const express = require("express");
const {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

router.route("/").post(createDepartment);

router.route(`/:id`).put(updateDepartment).delete(deleteDepartment);

module.exports = router;
