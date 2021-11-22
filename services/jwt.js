const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  return await jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

module.exports = { createToken };
