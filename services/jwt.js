require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  return await jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { createToken };
