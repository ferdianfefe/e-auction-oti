const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function topup(req, res) {
  const { itemName } = req.body;
  const user = await User.findOne({ _id: req.user._id });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  user.balance += 1000;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Top up success",
  });
}

async function transfer(req, res) {
  console.log("transfer");
  const { amount, receiver, password } = req.body;
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  if (user.balance < amount) {
    return res.status(400).json({
      success: false,
      message: "Insufficient balance",
    });
  }
  const receiverUser = await User.findOne({ username: receiver });
  if (!receiverUser) {
    return res.status(404).json({
      success: false,
      message: "Receiver not found",
    });
  }
  user.balance -= parseInt(amount);
  receiverUser.balance += parseInt(amount);
  await user.save();
  await receiverUser.save();
  return res.status(200).json({
    success: true,
    message: "Transfer success",
  });
}

module.exports = {
  topup,
  transfer,
};
