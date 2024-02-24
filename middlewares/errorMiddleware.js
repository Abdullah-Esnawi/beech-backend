const ApiResponse = require("../utils/ApiResponse");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) => {
  const response = new ApiResponse("error", err.message, err.statusCode);
  res.status(err.statusCode).json(response);
};

const handleJwtInvalidSignature = () =>
  new ApiResponse("error", "Invalid token, please login again..", 401);

const handleJwtExpired = () =>
  new ApiResponse("error", "Expired token, please login again..", 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
