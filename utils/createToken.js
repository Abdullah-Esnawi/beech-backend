const jwt = require("jsonwebtoken");

const createToken = (payload, secretKey) =>
  jwt.sign({ userId: payload }, secretKey, {
    expiresIn: "10h", // process.env.JWT_EXPIRE_TIME,
  });

module.exports = createToken;
