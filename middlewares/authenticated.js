"use strict";
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  /* if token does not exist */
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  /* check if token is valid */
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { verifyToken };
