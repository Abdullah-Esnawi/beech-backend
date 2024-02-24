const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/ApiResponse");

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ApiResponse("error",errors.array()[0].msg, 400);
    return res.status(400).json(response);
    // return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;
