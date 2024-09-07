const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      statck: err.stack,
    });
  };

  const sendErrorProd = (err, res) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Display error in console
      console.log("-- Error --", err);

      // Send generic error message
      res.json({
        status: "error",
        message: "somthing went very wrong",
      });
    }
  };

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};

module.exports = { errorHandler };
