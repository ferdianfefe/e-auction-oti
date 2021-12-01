const User = require("../models/user");

function topup() {
  return async (req, res) => {
    const { amount } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.balance += amount;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Top up success",
    });
  };
}

function transfer() {
  return async (req, res) => {
    const { amount, receiver } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }
    const receiverUser = await User.findOne({ _id: receiver });
    if (!receiverUser) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }
    user.balance -= amount;
    receiverUser.balance += amount;
    await user.save();
    await receiverUser.save();
    return res.status(200).json({
      success: true,
      message: "Transfer success",
    });
  };
}

module.exports = {
  topup,
  transfer,
};
