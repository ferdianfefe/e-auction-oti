require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const path = require("path");
const User = require("./models/user");

/* Create express app */
const app = express();

/* Body parser */
app.use(express.json({ limit: "25mb" }));

/* Enable CORS */
app.use(cors());

/* MongoDB connection */
mongoose.connect(process.env.MONGOURI, (err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

/* Routes */
const userRouter = require("./routes/user");
const auctionRouter = require("./routes/auction");
const coinRouter = require("./routes/coin");
const chatRouter = require("./routes/chat");

app.use("/api/user", userRouter);
app.use("/api/auction", auctionRouter);
app.use("/api/coin", coinRouter);
app.use("/api/chat", chatRouter);
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Socket io
io.on("connection", (socket) => {
  socket.on("online", (userId) => {
    User.updateOne({ _id: userId }, { isOnline: true }, (err, res) => {
      if (err) throw err;
      socket.broadcast.emit("online", userId);
    });
  });

  socket.on("offline", (userId) => {
    User.updateOne({ _id: userId }, { isOnline: false }, (err, res) => {
      if (err) throw err;
      socket.broadcast.emit("offline", userId);
    });
  });
  socket.on("send-message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
