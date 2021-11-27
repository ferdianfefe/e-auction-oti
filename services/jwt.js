require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = async (payload) => {
  return await jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { createToken };
