const {
  createTruck,
  getTrucks,
  updateTruck,
} = require("../controllers/truckController");
const router = require("express").Router();

router.route("/").post(createTruck).get(getTrucks);
router.route("/:id").post(updateTruck);

module.exports = router;
