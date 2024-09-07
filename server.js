const express = require("express");
const dotenv = require("dotenv").config();
const Logger = require("./middleware/loggerMiddleware");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const departmentRoutes = require("./routes/departmentRoutes");
const truckRoutes = require("./routes/truckRoute");

const AppError = require("./utils/commonClass");
const { errorHandler } = require("./controllers/errorHandlingConroller");
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 5000;

// Express Server
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(Logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle Routes
app.get("/", (req, res) => {
  res.status(200).json("Welcome to Admin Help");
});

// User Route
app.use("/api/user", userRoutes);
app.use("/api/dept", departmentRoutes);
app.use("/api/truck", truckRoutes);

// Unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError("Cant find required resource on this server", 404));
});

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Server running on Port ${PORT}`);
});
