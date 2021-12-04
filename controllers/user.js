require("dotenv").config();

const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { createToken } = require("../services/jwt");

/* Register user */
async function signup(req, res) {
  let { name, username, password } = req.body;
  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "Username already exists",
    });
  }

  /* generate salt */
  const salt = await bcrypt.genSalt(10);

  /* hash password */
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({ name, username, password: hashedPassword });
  user.save((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error registering user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  });
}

/* Login user */
async function signin(req, res) {
  let { username, password } = req.body;

  /* check if user exists */
  let user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  /* check if password is correct */
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  /* generate token */
  const token = await createToken({
    _id: user._id,
    name: user.name,
    username: user.username,
  });

  if (!token) {
    return res.status(500).json({
      success: false,
      message: "Error generating token",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    value: {
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    },
  });
}

async function getMyProfile(req, res) {
  /* find user */
  let user = await User.findById(req.user._id);
  return res.status(200).json({
    success: true,
    message: "User profile",
    value: {
      user,
    },
  });
}

async function getContacts(req, res) {
  const contacts = await User.find({ _id: { $ne: req.user._id } });
  res.status(200).json({
    success: true,
    value: contacts,
  });
}

module.exports = { signup, signin, getMyProfile, getContacts };
