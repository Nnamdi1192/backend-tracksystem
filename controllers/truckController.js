const Truck = require("../model/TruckModel");
const { asyncFunction } = require("../utils/commonFunctions");

const createTruck = asyncFunction(async (req, res, next) => {
  console.log(req.body);
  const truckDetails = await Truck.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      truck: truckDetails,
    },
  });
});

const getTrucks = asyncFunction(async (req, res, next) => {
  const trucks = await Truck.find();

  res.status(200).json({
    status: "success",
    data: {
      truck: trucks,
    },
  });
});

const updateTruck = asyncFunction(async (req, res, next) => {
  const { id } = req.params;
  const truckDetails = req.body;

  const truck = await Truck.findOneAndUpdate({ _id: id }, truckDetails, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      truck: truck,
    },
  });
});

const deleteTruck = asyncFunction(async (req, res, next) => {
  const { id } = req.params;
  const truckDetails = req.body;

  const truck = await Truck.findOneAndDelete({ _id: id });

  res.status(200).json({
    status: "success",
    data: {
      message: "truck deleted",
    },
  });
});

module.exports = { createTruck, getTrucks, updateTruck, deleteTruck };
