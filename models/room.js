const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Room = mongoose.model("Room", roomSchema);
