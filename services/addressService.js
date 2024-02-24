const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const ApiResponse = require("../utils/ApiResponse");

// @desc    Add address to user addresses list
// @route   POST /api/v1/addresses
// @access  Protected/User
exports.addAddress = asyncHandler(async (req, res, next) => {
  // $addToSet => add address object to user addresses  array if address not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  const response = ApiResponse(
    "success",
    "Address Added Successfully.",
    200,
    user.addresses
  );
  res.status(200).json(response);
});

// @desc    Remove address from user addresses list
// @route   DELETE /api/v1/addresses/:addressId
// @access  Protected/User
exports.removeAddress = asyncHandler(async (req, res, next) => {
  // $pull => remove address object from user addresses array if addressId exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  const response = ApiResponse(
    "success",
    "Address Removed Successfully.",
    200,
    user.addresses
  );
  res.status(200).json(response);
});

// @desc    Get logged user addresses list
// @route   GET /api/v1/addresses
// @access  Protected/User
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("addresses");


  const response = ApiResponse(
    "success",
    null,
    200,
    user.addresses
  );
  res.status(200).json(response);
});
