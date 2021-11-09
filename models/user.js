const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name,
  username,
  password,
});

module.exports = mongoose.model("User", UserSchema);
